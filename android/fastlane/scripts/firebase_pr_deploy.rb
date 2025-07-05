require_relative './firebase_distribution_service'

# Generates a preview build for a pull request and uploads it to Firebase App Distribution.
#
# This supports QA and review workflows by automating the process of building an APK,
# uploading it to Firebase, and attaching metadata to identify it with a specific PR.
#
# Releases are tagged with PR metadata (number, title) so they can be surfaced contextually,
# and later cleaned up automatically when the PR is closed or merged.
#
# @param pr_number [String] The pull request number (used in release notes and cleanup)
# @param pr_title [String] The pull request title (used in release notes for context)
# @param project_number [String] Firebase project number
# @param app_id [String] Firebase app ID
# @param service_account_path [String] Path to the GCP service account JSON key
def firebase_pr_deploy(pr_number:, pr_title:, project_number:, app_id:, service_account_path:, package_name:, json_key_file:)
  firebase = FirebaseDistributionService.new(
    project_number: project_number,
    app_id: app_id,
    service_account_path: service_account_path
  )
  sh("mkdir -p android/app/src/main/assets")
  sh("mkdir -p android/app/src/main/res")
  sh("npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res")

  internal_codes = google_play_track_version_codes(
    package_name:  package_name,
    json_key:      json_key_file,
    track:         "internal",
    timeout:       300
  )
  UI.message("Internal track codes: #{internal_codes}")

  # 2) Fetch all versionCodes on the production track
  production_codes = google_play_track_version_codes(
    package_name:  package_name,
    json_key:      json_key_file,
    track:         "production",
    timeout:       300
  )
  UI.message("Production track codes: #{production_codes}")

  # 3) Combine, find max, bump
  all_codes = (internal_codes + production_codes).map(&:to_i)
  next_code = (all_codes.max || 0) + 1
  final_code = "#{next_code}#{pr_number}".to_i

  gradle_path = File.expand_path("../../app/build.gradle", __dir__)
  increment_version_code(
    version_code:   final_code,
    gradle_file_path: gradle_path
  )

  firebase.build_apk

  apk_path = File.expand_path("../../app/build/outputs/apk/debug/app-debug.apk", __dir__)
  unless File.exist?(apk_path)
    UI.user_error!("❌ APK file not found at #{apk_path}")
  end

  operation_name = firebase.upload_apk(apk_path)
  release_name = firebase.poll_for_release(operation_name)

  firebase.add_release_notes(release_name, pr_number, pr_title)
  
  firebase.build_aab

  aab_path = File.expand_path("../../app/build/outputs/bundle/release/app-release.aab", __dir__)
  unless File.exist?(aab_path)
    UI.user_error!("❌ AAB file not found at #{aab_path}")
  end
  upload_to_play_store(
    track: "internal",
    json_key: json_key_file,
    skip_upload_apk: true, 
    skip_upload_metadata: true,
    skip_upload_images: true,
    skip_upload_screenshots: true,
    release_status: "draft",
    aab: aab_path
  )

  UI.message("✅ Uploaded to Google Play Internal Track")
end
require_relative './Google_Play_Track_Service'

##
# Builds, uploads, and annotates a Google Play Internal Track App Distribution release for a given PR.
#
# This is intended to support preview builds for QA and review purposes.
#
# @param pr_number [String] The pull request number
# @param package_name [String] The package name of the app (e.g., "com.example.app")
# @param json_key_file [String] Path to the GCP service account JSON key file
def gplay_pr_deploy(pr_number:, package_name:, json_key_file:)

  # Create an instance of the GooglePlayInternalTrack class to handle app track interactions
  service = GooglePlayInternalTrack.new()

  # 1) Fetch all version codes on the internal track
  internal_codes = service.fetch_version_codes_for_tracks(
    package_name: package_name,
    json_key_file: json_key_file,
    track: "internal",
    timeout: 300
  )
  UI.message("Internal track codes: #{internal_codes}")

  # Fetch version codes for production track
  production_codes = service.fetch_version_codes_for_tracks(
    package_name: package_name,
    json_key_file: json_key_file,
    track: "production",
    timeout: 300
  )
  UI.message("Production track codes: #{production_codes}") # Output production track codes for reference

  # 3) Combine the version codes from both tracks (internal + production), find the max version code,
  #    and bump it for the new release version.
  all_codes = (internal_codes + production_codes).map(&:to_i) # Combine and convert to integers
  next_code = (all_codes.empty? ? 1 : all_codes.max + 1) # Find max version code and increment by 1
  final_code = "#{next_code}#{pr_number}".to_i # Append the PR number to the version code

  # Specify the Gradle build file for version code increment
  gradle_path = File.expand_path("../../app/build.gradle", __dir__)

  # Increment the version code in the Gradle file
  increment_version_code(
    version_code: final_code, # Incremented version code
    gradle_file_path: gradle_path # Path to the Gradle file
  )

  # 4) Build the AAB (Android App Bundle) using the GooglePlayInternalTrack service
  service.build_aab

  # 5) Ensure the AAB exists at the specified path
  aab_path = File.expand_path("../../app/build/outputs/bundle/release/app-release.aab", __dir__)
  unless File.exist?(aab_path)
    UI.user_error!("❌ AAB file not found at #{aab_path}") # Raise an error if AAB is not found
  end

  # 6) Upload the AAB to Google Play Internal Track
  upload_to_play_store(
    track: "internal", # Specify the track as "internal"
    json_key: json_key_file, # Path to Google Play service account JSON key
    skip_upload_apk: true, # Skip APK upload (since we're uploading AAB)
    skip_upload_metadata: true, # Skip uploading metadata
    skip_upload_images: true, # Skip uploading images
    skip_upload_screenshots: true, # Skip uploading screenshots
    release_status: "completed", # Set the release status to "completed"
    aab: aab_path # Path to the built AAB
  )

  # 7) Output a success message
  UI.message("✅ Uploaded to Google Play Internal Track")
end

require_relative './firebase_distribution_service'

# Generates a preview build for a pull request and uploads it to Firebase App Distribution.
#
# This supports QA and review workflows by automating the process of building an APK,
# uploading it to Firebase, and attaching metadata to identify it with a specific PR.
#
# Releases are tagged with PR metadata (number, title) and release notes so they can be
# surfaced contextually, and later cleaned up automatically when the PR is closed or merged.
#
# @param pr_number [String] The pull request number (used in release notes and cleanup)
# @param pr_title [String] The pull request title (used in release notes for context)
# @param project_number [String] Firebase project number
# @param app_id [String] Firebase app ID
# @param service_account_path [String] Path to the GCP service account JSON key
# @param release_notes_file [String] Path to file containing release notes (optional)
def firebase_pr_deploy(pr_number:, pr_title:, project_number:, app_id:, service_account_path:, release_notes: "")
  firebase = FirebaseDistributionService.new(
    project_number: project_number,
    app_id: app_id,
    service_account_path: service_account_path
  )

  skip_upload = ENV["FIREBASE_SKIP_UPLOAD"] == "1"
  export_apk_path = ENV["APK_PATH_FILE"]
  provided_apk = ENV["APK_PATH"]
  
  # Cleanup old builds for specific PR before creating a new one
  if provided_apk.to_s.strip.empty?
    old_releases = firebase.fetch_releases_by_pr_number(pr_number)
    unless old_releases.empty?
      UI.message("🧹 Cleaning up old releases for PR ##{pr_number} before uploading a new one...")
      firebase.delete_releases(old_releases)
    end
  end

  package_json_path = File.expand_path("../../../package.json", __dir__)
  UI.user_error!("❌ package.json not found at #{package_json_path}") unless File.exist?(package_json_path)
  package_json = JSON.parse(File.read(package_json_path))
  version = package_json["version"]
  UI.user_error!("❌ Version not found in package.json") unless version
  major, minor, patch = version.split('.').map(&:to_i)
  version_code = (major * 10_000) + (minor * 100) + patch

  if provided_apk && !provided_apk.strip.empty?
    apk_path = File.expand_path(provided_apk)
    UI.user_error!("❌ Provided APK file not found at #{apk_path}") unless File.exist?(apk_path)
    version_info = { version: version, version_code: version_code, apk_path: apk_path }
    UI.message("ℹ️ Re-using prebuilt APK at #{apk_path}")
  else
    # Build the new APK with unique version code (returns version code)
    version_info = firebase.build_apk(pr_number: pr_number)
    apk_path = version_info[:apk_path]
    UI.user_error!("❌ APK file not found at #{apk_path}") unless File.exist?(apk_path)
  end

  if export_apk_path && !export_apk_path.strip.empty?
    File.write(export_apk_path, apk_path)
    UI.message("📝 Wrote APK path to #{export_apk_path}")
  end

  if skip_upload
    UI.message("⏭️ FIREBASE_SKIP_UPLOAD is set; skipping upload. APK ready at #{apk_path}")
    return version_info
  end
  
  # Read release notes if provided
  if release_notes && !release_notes.strip.empty?
    UI.message("📖 Loaded release notes from workflow input")
  else
    UI.message("⚠️ No release notes provided")
  end

  
  # Upload and process
  operation_name = firebase.upload_apk(apk_path)
  release_name = firebase.poll_for_release(operation_name)
  
  # Add PR metadata and release notes
  firebase.add_release_notes(release_name, pr_number, pr_title, release_notes, version_info)
end

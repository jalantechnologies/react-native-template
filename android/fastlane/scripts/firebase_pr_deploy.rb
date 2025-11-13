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
# @param release_notes [String] Release notes content (optional)
# @param version_info [Hash] Version info from sync_versions lane (includes :version and :version_code)
def firebase_pr_deploy(pr_number:, pr_title:, project_number:, app_id:, service_account_path:, release_notes: "", version_info: {})
  firebase = FirebaseDistributionService.new(
    project_number: project_number,
    app_id: app_id,
    service_account_path: service_account_path
  )

  # Cleanup old builds for specific PR before creating a new one
  old_releases = firebase.fetch_releases_by_pr_number(pr_number)
  unless old_releases.empty?
    UI.message("🧹 Cleaning up old releases for PR ##{pr_number} before uploading a new one...")
    firebase.delete_releases(old_releases)
  end

  # Build the new APK (version code already set by sync_versions)
  firebase.build_apk
  apk_path = File.expand_path("../../app/build/outputs/apk/debug/app-debug.apk", __dir__)
  UI.user_error!("❌ APK file not found at #{apk_path}") unless File.exist?(apk_path)

  # Upload and process
  operation_name = firebase.upload_apk(apk_path)
  release_name = firebase.poll_for_release(operation_name)

  # Add PR metadata with release notes and version info
  firebase.add_release_notes(release_name, pr_number, pr_title, release_notes, version_info)
end

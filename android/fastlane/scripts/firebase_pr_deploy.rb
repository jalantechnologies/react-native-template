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
def firebase_pr_deploy(pr_number:, pr_title:, project_number:, app_id:, service_account_path:)
  firebase = FirebaseDistributionService.new(
    project_number: project_number,
    app_id: app_id,
    service_account_path: service_account_path
  )

  firebase.build_apk

  apk_path = File.expand_path("../../app/build/outputs/apk/debug/app-debug.apk", __dir__)
  unless File.exist?(apk_path)
    UI.user_error!("❌ APK file not found at #{apk_path}")
  end

  operation_name = firebase.upload_apk(apk_path)
  release_name = firebase.poll_for_release(operation_name)

  firebase.add_release_notes(release_name, pr_number, pr_title)
end

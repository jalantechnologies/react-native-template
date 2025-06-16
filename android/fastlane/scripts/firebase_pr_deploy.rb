require_relative './firebase_distribution_service'

##
# Builds, uploads, and annotates a Firebase App Distribution release for a given PR.
#
# This is intended to support preview builds for QA and review purposes.
#
# @param pr_number [String] The pull request number
# @param pr_title [String] The pull request title (for context in release notes)
# @param project_number [String] Firebase project number
# @param app_id [String] Firebase app ID
# @param service_account_path [String] Path to GCP service account JSON
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

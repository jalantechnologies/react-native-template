require_relative './firebase_distribution_service'

# Cleans up all Firebase App Distribution releases associated with a given PR number.
#
# This is useful to avoid cluttering Firebase with old PR builds once the PR is closed or merged.
#
# @param pr_number [String] The PR number associated with the releases
# @param project_number [String] Firebase project number
# @param app_id [String] Firebase app ID
# @param service_account_path [String] Path to GCP service account JSON
def firebase_pr_cleanup(pr_number:, project_number:, app_id:, service_account_path:)
  service = FirebaseDistributionService.new(
    project_number: project_number,
    app_id: app_id,
    service_account_path: service_account_path
  )

  releases_to_delete = service.fetch_releases_by_pr_number(pr_number)

  if releases_to_delete.empty?
    UI.message("ℹ️ No releases found for PR ##{pr_number}. Nothing to delete.")
  else
    service.delete_releases(releases_to_delete)
  end
end

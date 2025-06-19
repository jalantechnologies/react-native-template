require_relative './firebase_distribution_service'

# Deletes Firebase App Distribution releases that were created for a specific PR.
#
# This helps keep Firebase clean by removing outdated preview builds once a PR is closed or merged.
# We identify releases tied to a PR using metadata embedded during the deployment process.
#
# @param pr_number [String] The pull request number (used to locate associated releases)
# @param project_number [String] Firebase project number
# @param app_id [String] Firebase app ID
# @param service_account_path [String] Path to the GCP service account JSON
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

require_relative './Google_Play_Track_Service'

# Cleans up all Google Play Internal Track App Distribution releases associated with a given PR number.
#
# This is useful to avoid cluttering Google Play Internal Track with old PR builds once the PR is closed or merged.
#
# @param pr_number [String] The PR number associated with the releases
# @param package_name [String] The package name of the app (e.g., "com.example.app")
# @param json_key_file [String] Path to the GCP service account JSON key file
def gplay_pr_cleanup(pr_number:, package_name:, json_key_file:)

  # Create an instance of the GooglePlayInternalTrack class to handle app track interactions
  service = GooglePlayInternalTrack.new()

  # Remove all the version releases related to the PR number from the "internal" track
  # This will clean up any builds that were uploaded for this PR to avoid clutter
  service.remove_pr_bundle_from_track(
    package_name:  package_name,  # The package name of the app
    pr_number:     pr_number,     # The PR number for which the releases were created
    json_key_file: json_key_file, # Path to the service account JSON key for authentication
    track_name:    "internal"     # The track name from which the releases should be removed
  )
end

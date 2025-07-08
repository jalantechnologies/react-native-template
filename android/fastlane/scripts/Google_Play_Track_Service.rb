require 'uri'
require 'net/http'
require 'json'
require 'time'
require 'fastlane'
require "google/apis/androidpublisher_v3"
require "googleauth"
require 'stringio'

include Fastlane

# Service class for interacting with Google Play Internal Track API.
# This class contains methods for:
# - Building the Android App Bundle (AAB)
# - Removing a PR-related bundle from the track
class GooglePlayInternalTrack
  ##
  # Builds the Android App Bundle (AAB) using Gradle.
  # This method configures the necessary environment variables for Gradle
  # and uses the `GradleAction` to run the "bundle" task for the release build.
  #
  # @return [void] Raises an error if the AAB is not found
  def build_aab
    # Set Gradle options for CI environments
    ENV["GRADLE_OPTS"] = "-Xmx6g -XX:MaxMetaspaceSize=2g -Dfile.encoding=UTF-8"

    # Run the Gradle build command with the release configuration
    Actions::GradleAction.run(
      task: "bundle",
      build_type: "Release", # Using Release build type
      properties: {
        "android.injected.signing.store.file" => ENV["KEYSTORE_FILE"], # Keystore file for signing
        "android.injected.signing.store.password" => ENV["KEYSTORE_PASSWORD"], # Keystore password
        "android.injected.signing.key.alias" => ENV["KEY_ALIAS"], # Key alias for signing
        "android.injected.signing.key.password" => ENV["KEY_PASSWORD"], # Key password for signing
        "org.gradle.daemon" => "false", # Disable Gradle daemon for CI
        "org.gradle.workers.max" => "2" # Limit the number of workers for Gradle
      },
      project_dir: File.expand_path("../..", __dir__), # Set project directory path
      gradle_path: "gradlew", # Path to Gradle wrapper
      print_command: true, # Print the Gradle command being executed
      print_command_output: true # Print the command output
    )

    # Check if the AAB was successfully generated
    aab = aab_path
    UI.user_error!("❌ AAB not found at #{aab}") unless File.exist?(aab)
  end

  ##
  # Removes a PR-related bundle from the specified track (e.g., "internal").
  # It searches for version codes related to a specific PR number and removes them
  # from the track.
  #
  # @param package_name [String] The package name of the app (e.g., "com.example.app")
  # @param pr_number [String] The pull request number associated with the release
  # @param json_key_file [String] Path to the GCP service account JSON key file
  # @param track_name [String] The track name to remove releases from (e.g., "internal")
  # @return [void] Updates the track and commits the changes
  def remove_pr_bundle_from_track(package_name:, pr_number:, json_key_file:, track_name:)
    # Read the service account credentials from the provided JSON key file
    key_json = File.read(json_key_file)
    androidpublisher = Google::Apis::AndroidpublisherV3::AndroidPublisherService.new

    # Authenticate using the service account credentials
    androidpublisher.authorization =
      Google::Auth::ServiceAccountCredentials.make_creds(
        json_key_io: StringIO.new(key_json),
        scope: ["https://www.googleapis.com/auth/androidpublisher"] # Scope required to interact with Play Console
      )

    # Step 1: Start an edit session to modify the track
    edit = androidpublisher.insert_edit(package_name)
    UI.message("Started edit #{edit.id}")

    # Step 2: Fetch the existing track to find the versions related to the PR number
    track = androidpublisher.get_edit_track(package_name, edit.id, track_name)
    UI.message("Track '#{track_name}' has #{track.releases.flat_map(&:version_codes).size} versionCodes")

    # Step 3: Remove version codes that end with the PR number
    track.releases.each do |release|
      before = release.version_codes.dup # Keep a copy of the original version codes
      release.version_codes.reject! { |vc| vc.to_s.end_with?(pr_number) } # Remove version codes matching the PR number
      if before.size != release.version_codes.size
        UI.success("➖ Stripped out versionCodes #{before - release.version_codes}")
      end
    end

    # If no releases are left after removal, clear the track's release list
    track.releases.reject! { |r| r.version_codes.empty? }

    # Step 4: Push the updated track back to Google Play
    track_req = Google::Apis::AndroidpublisherV3::Track.new(
      releases: track.releases
    )
    androidpublisher.update_edit_track(
      package_name,
      edit.id,
      track_name,
      track_req
    )
    UI.message("Uploaded updated track “#{track_name}”")

    # Step 5: Commit the changes to finalize the update
    androidpublisher.commit_edit(package_name, edit.id)
    UI.success("✅ Committed edit, draft release removed.")
  end

  private

  ##
  # Helper method to return the default path to the built AAB.
  #
  # @return [String] The absolute path to the release AAB
  def aab_path
    File.expand_path("../../app/build/outputs/bundle/release/app-release.aab", __dir__) # The path to the built AAB
  end
end

require 'uri'
require 'net/http'
require 'json'
require 'time'
require 'fastlane'

include Fastlane

# Service class for interacting with Firebase App Distribution APIs.
# authentication, APK upload, release polling, release note patching, and cleanup.
class FirebaseDistributionService
  ##
  # Initialize the service with Firebase project config and authenticate.
  #
  # @param project_number [String] Firebase project number
  # @param app_id [String] Firebase App Distribution app ID
  # @param service_account_path [String] Path to GCP service account JSON
  def initialize(project_number:, app_id:, service_account_path:)
    @project_number = project_number
    @app_id = app_id
    @service_account_path = service_account_path

    @http = Net::HTTP.new("firebaseappdistribution.googleapis.com", 443)
    @http.use_ssl = true

    authenticate
  end

  # Authenticates using gcloud and sets access token for subsequent API calls.
  # Auth is performed at initialization.
  def authenticate
    Actions.sh("gcloud auth activate-service-account --key-file='#{@service_account_path}'")
    @access_token = Actions.sh("gcloud auth print-access-token", log: false).strip
    UI.message("✅ Authenticated with service account")
  end

  # Builds the debug APK using Gradle.
  # Gradle options are set to optimize resource usage in CI environments.
  def build_apk
    ENV["GRADLE_OPTS"] = "-Xmx6g -XX:MaxMetaspaceSize=2g -Dfile.encoding=UTF-8"

    Actions::GradleAction.run(
      task: "assemble",
      build_type: "Debug",
      project_dir: File.expand_path("../..", __dir__),
      gradle_path: "gradlew",
      properties: {
        "org.gradle.daemon" => "false",
        "org.gradle.workers.max" => "2"
      },
      print_command: true,
      print_command_output: true
    )

    apk = apk_path
    unless File.exist?(apk)
      UI.user_error!("❌ APK not found at #{apk}")
    end
  end

  # Uploads the APK to Firebase App Distribution.
  #
  # @param apk_path [String] Path to APK file
  # @return [String] Operation name returned by Firebase for polling release
  def upload_apk(apk_path)
    uri = URI("https://firebaseappdistribution.googleapis.com/upload/v1/projects/#{@project_number}/apps/#{@app_id}/releases:upload")
    apk_data = File.binread(apk_path)

    request = Net::HTTP::Post.new(uri).tap do |req|
      req["Authorization"] = "Bearer #{@access_token}"
      req["X-Goog-Upload-Protocol"] = "raw"
      req["X-Goog-Upload-File-Name"] = File.basename(apk_path)
      req.body = apk_data
    end

    response = @http.request(request)
    UI.message("📤 APK uploaded to Firebase")

    unless [200, 201].include?(response.code.to_i)
      UI.user_error!("❌ Upload failed: #{response.code} - #{response.body}")
    end

    JSON.parse(response.body)["name"]
  end

  # Polls Firebase API for the release associated with the upload operation.
  #
  # @param operation_name [String] Operation name returned from upload API
  # @param max_tries [Integer] Max polling attempts before timeout
  # @return [String] Release name for patching release notes
  def poll_for_release(operation_name, max_tries: 10)
    uri = URI("https://firebaseappdistribution.googleapis.com/v1/#{operation_name}")

    max_tries.times do |attempt|
      sleep(3)

      request = Net::HTTP::Get.new(uri)
      request["Authorization"] = "Bearer #{@access_token}"

      response = @http.request(request)

      if response.code.to_i == 200
        result = JSON.parse(response.body)
        release = result.dig("response", "release", "name")
        return release if result["done"] && release
      end

      UI.message("⏳ Waiting for Firebase release... Attempt #{attempt + 1}")
    end

    UI.user_error!("❌ Timeout waiting for Firebase release")
  end

  # Attaches contextual release notes to the release in Firebase.
  #
  # @param release_name [String] Release resource name
  # @param pr_number [String] Pull request number
  # @param pr_title [String] Pull request title
  def add_release_notes(release_name, pr_number, pr_title)
    uri = URI("https://firebaseappdistribution.googleapis.com/v1/#{release_name}")
    notes = "PR ##{pr_number}: #{pr_title} - Uploaded on #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}"

    request = Net::HTTP::Patch.new(uri)
    request["Authorization"] = "Bearer #{@access_token}"
    request["Content-Type"] = "application/json"
    request.body = { releaseNotes: { text: notes } }.to_json

    response = @http.request(request)

    unless response.code.to_i == 200
      UI.user_error!("❌ Failed to patch release: #{response.code} - #{response.body}")
    end

    UI.message("✅ Release notes added for PR ##{pr_number}")
  end

  # Fetches all releases and filters those that match the given PR number.
  #
  # @param pr_number [String] PR number to match in release notes
  def fetch_releases_by_pr_number(pr_number)
    uri = URI("https://firebaseappdistribution.googleapis.com/v1/projects/#{@project_number}/apps/#{@app_id}/releases")

    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{@access_token}"

    response = @http.request(request)
    unless response.code.to_i == 200
      UI.user_error!("❌ Failed to fetch releases: #{response.code} - #{response.body}")
    end

    JSON.parse(response.body)["releases"]&.filter_map do |release|
      release["name"] if release.dig("releaseNotes", "text")&.include?("PR ##{pr_number}")
    end || []
  end

  # Deletes multiple Firebase releases by their resource names.
  #
  # @param release_names [Array<String>] List of Firebase release resource names
  def delete_releases(release_names)
    uri = URI("https://firebaseappdistribution.googleapis.com/v1/projects/#{@project_number}/apps/#{@app_id}/releases:batchDelete")

    request = Net::HTTP::Post.new(uri)
    request["Authorization"] = "Bearer #{@access_token}"
    request["Content-Type"] = "application/json"
    request.body = { names: release_names }.to_json

    response = @http.request(request)

    UI.message("✅ Deleted releases: #{release_names.join(', ')}")
    UI.message("Response: #{response.body}")
  end

  private

  # Helper to return the default APK path.
  #
  # @return [String] Absolute path to the debug APK
  def apk_path
    File.expand_path("../../app/build/outputs/apk/debug/app-debug.apk", __dir__)
  end
end

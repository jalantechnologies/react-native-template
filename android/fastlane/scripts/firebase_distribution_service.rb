require 'uri'
require 'net/http'
require 'json'
require 'time'
require 'fastlane'

include Fastlane

# Provides an interface to Firebase App Distribution for PR-based preview workflows.
# This class wraps core functionality:
# - Authenticate via gcloud
# - Build APKs (optimized for CI)
# - Upload APKs to Firebase App Distribution
# - Attach PR metadata and release notes to releases
# - Clean up preview releases associated with closed PRs
# Intended to support short-lived PR preview releases, not production deployments.
class FirebaseDistributionService
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

  # Authenticates using the provided service account key via gcloud.
  # This sets up a short-lived access token for API interactions.
  def authenticate
    Actions.sh("gcloud auth activate-service-account --key-file='#{@service_account_path}'")
    @access_token = Actions.sh("gcloud auth print-access-token", log: false).strip
    UI.message("✅ Authenticated with service account")
  end

  # Builds a debug APK using Gradle with CI-safe options.
  # Version code and name are derived from package.json and injected via Gradle properties.
  # Optimizations:
  # - Daemon disabled (stateless)
  # - Limited workers to reduce memory use
  def build_apk(pr_number:)
    version_info = read_version_info

    ENV["GRADLE_OPTS"] = "-Xmx6g -XX:MaxMetaspaceSize=2g -Dfile.encoding=UTF-8"

    UI.message("🔨 Building APK with Gradle...")

    Actions::GradleAction.run(
      gradle_path: "./gradlew",
      task: "assembleDebug",
      project_dir: File.expand_path("../../", __dir__),
      properties: {
        "BUNDLE_IN_DEBUG" => "true",
        "org.gradle.daemon" => "false",
        "org.gradle.workers.max" => "4",
        "versionCode" => version_info[:version_code],
        "versionName" => version_info[:version],
      },
      print_command: true,
      print_command_output: true
    )

    apk = apk_path
    UI.user_error!("❌ APK not found at #{apk}") unless File.exist?(apk)
    UI.success("✅ APK built successfully: #{File.size(apk)} bytes")

    version_info
  end


  # Uploads an APK file to Firebase App Distribution.
  # @param apk_path [String] Absolute path to the APK file
  # @return [String] Operation name used for polling the release
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

  # Polls the Firebase API until the uploaded APK is processed into a release.
  # Firebase requires polling the long-running operation returned from upload.
  # @param operation_name [String] Operation returned from upload_apk
  # @param max_tries [Integer] Maximum number of polling attempts (default: 10)
  # @return [String] The resulting Firebase release name
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

  # Adds contextual release notes to the given Firebase release.
  # This embeds PR info and release notes into the release for traceability.
  # @param release_name [String] Firebase release resource name (e.g. projects/*/apps/*/releases/*)
  # @param pr_number [String] Associated pull request number
  # @param pr_title [String] PR title for extra context
  # @param release_notes [String] Release notes content from docs/release_notes
  # @param version_info [Hash] Version info from sync_versions lane (includes :version and :version_code)
  def add_release_notes(release_name, pr_number, pr_title, release_notes, version_info)
    uri = URI("https://firebaseappdistribution.googleapis.com/v1/#{release_name}")
    
    # Build comprehensive notes with PR info and release notes
    notes = if release_notes && !release_notes.strip.empty?
      <<~NOTES
        PR ##{pr_number}: #{pr_title}
        📋 **Release Notes:**
        #{release_notes.strip}

        ---
        🔍 **Build Info:**
        Version: #{version_info[:version]} (Code: #{version_info[:version_code]})
      NOTES
    else
      "PR ##{pr_number}: #{pr_title}\nVersion: #{version_info[:version]} (Code: #{version_info[:version_code]})\nUploaded: #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}"
    end

    request = Net::HTTP::Patch.new(uri)
    request["Authorization"] = "Bearer #{@access_token}"
    request["Content-Type"] = "application/json"
    request.body = { releaseNotes: { text: notes.strip } }.to_json

    response = @http.request(request)

    UI.user_error!("❌ Failed to patch release: #{response.code} - #{response.body}") unless response.code.to_i == 200
    UI.message("✅ Release notes added for PR ##{pr_number} (Version: #{version_info[:version]})")
  end

  # Fetches all Firebase releases and filters those related to a specific PR.
  # This powers cleanup logic by scanning notes for PR identifiers.
  # @param pr_number [String] PR number to match in release notes
  # @return [Array<String>] Firebase release resource names
  def fetch_releases_by_pr_number(pr_number)
    uri = URI("https://firebaseappdistribution.googleapis.com/v1/projects/#{@project_number}/apps/#{@app_id}/releases")

    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{@access_token}"

    response = @http.request(request)
    UI.user_error!("❌ Failed to fetch releases: #{response.code} - #{response.body}") unless response.code.to_i == 200

    JSON.parse(response.body)["releases"]&.filter_map do |release|
      release["name"] if release.dig("releaseNotes", "text")&.include?("PR ##{pr_number}")
    end || []
  end

  # Deletes one or more Firebase releases by resource name.
  # Used in PR cleanup flow to remove temporary preview builds.
  # @param release_names [Array<String>] List of release resource names
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

  # Reads version name and calculates version code from package.json
  def read_version_info
    package_json_path = File.expand_path("../../../package.json", __dir__)
    UI.user_error!("❌ package.json not found at #{package_json_path}") unless File.exist?(package_json_path)

    package_json = JSON.parse(File.read(package_json_path))
    version = package_json["version"]
    UI.user_error!("❌ Version not found in package.json") unless version

    major, minor, patch = version.split('.').map(&:to_i)
    version_code = (major * 10000) + (minor * 100) + patch

    { version: version, version_code: version_code }
  end

  # Returns the expected debug APK path.
  def apk_path
    File.expand_path("../../app/build/outputs/apk/debug/app-debug.apk", __dir__)
  end
end

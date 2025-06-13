require 'uri'
require 'net/http'
require 'json'
require 'time'

require 'fastlane'
include Fastlane


def firebase_pr_deploy(pr_number:, pr_title:, project_number:, app_id:, service_account_path:)
  apk_path = File.expand_path("../app/build/outputs/apk/debug/app-debug.apk", __dir__)

    # Authenticate 
    sh("gcloud auth activate-service-account --key-file='#{service_account_path}'")
    access_token = Actions.sh("gcloud auth print-access-token", log: false).strip
    UI.message("✅ Access token fetched")

    ENV["GRADLE_OPTS"] = "-Xmx6g -XX:MaxMetaspaceSize=2g -Dfile.encoding=UTF-8"

    gradle(
      task: "assemble",
      build_type: "Debug",
      properties: {
        "org.gradle.daemon" => "false",
        "org.gradle.workers.max" => "2"
     },
      print_command: true,
      print_command_output: true
    )

    # Upload the APK binary
    upload_url = "https://firebaseappdistribution.googleapis.com/upload/v1/projects/#{project_number}/apps/#{app_id}/releases:upload"
    UI.message("🚀 Uploading APK to Firebase App Distribution...")

    uri = URI(upload_url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    apk_data = File.binread(apk_path)
    apk_filename = File.basename(apk_path)

    request = Net::HTTP::Post.new(uri)
    request["Authorization"] = "Bearer #{access_token}"
    request["X-Goog-Upload-Protocol"] = "raw"
    request["X-Goog-Upload-File-Name"] = apk_filename
    request.body = apk_data

    response = http.request(request)
    UI.message("Uploading to: #{upload_url}")
    if response.code.to_i != 200 && response.code.to_i != 201
      UI.user_error!("Failed to upload APK: #{response.code} - #{response.body}")
    end

    upload_response = JSON.parse(response.body)
    UI.message("✅ APK uploaded. Operation: #{upload_response['name']}")

    operation_name = upload_response["name"]
    operation_url = "https://firebaseappdistribution.googleapis.com/v1/#{operation_name}"

    max_tries = 10
    release_name = nil

    max_tries.times do |i|
      sleep(3)
      uri = URI(operation_url)
      request = Net::HTTP::Get.new(uri)
      request["Authorization"] = "Bearer #{access_token}"
      response = http.request(request)
      if response.code.to_i != 200
        UI.message("⏳ Waiting for operation to complete... Attempt #{i+1}")
        next
      end
      op_response = JSON.parse(response.body)
      if op_response["done"] && op_response["response"] && op_response["response"]["release"]
        release_name = op_response["response"]["release"]["name"]
        break
      end
    end

    unless release_name
      UI.user_error!("Timeout: Release not created after upload.")
    end

  UI.message("✅ Release created: #{release_name}")

  # Now patch the release to add release notes
  patch_url = "https://firebaseappdistribution.googleapis.com/v1/#{release_name}"
  uri = URI(patch_url)

  release_notes_text = "PR ##{pr_number}: #{pr_title} - Build uploaded on #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}"

  patch_body = {
    "releaseNotes" => {
      "text" => release_notes_text
    }
  }.to_json

  request = Net::HTTP::Patch.new(uri)
  request["Authorization"] = "Bearer #{access_token}"
  request["Content-Type"] = "application/json"
  request.body = patch_body

  response = http.request(request)

  if response.code.to_i != 200
    UI.user_error!("Failed to patch release: #{response.code} - #{response.body}")
  end

  UI.message("✅ Release updated with release notes for PR ##{pr_number}")
end
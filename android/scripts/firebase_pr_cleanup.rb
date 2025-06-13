require 'uri'
require 'net/http'
require 'json'

require 'fastlane'
include Fastlane


def firebase_pr_cleanup(pr_number:, project_number:, app_id:, service_account_path:)
  #Authenticate 
    Actions.sh("gcloud auth activate-service-account --key-file='#{service_account_path}'")
    access_token = Actions.sh("gcloud auth print-access-token", log: false).strip
    UI.message("✅ Access token fetched")

    #Get all releases
    releases_url = "https://firebaseappdistribution.googleapis.com/v1/projects/#{project_number}/apps/#{app_id}/releases"
    UI.message("📥 Fetching releases from: #{releases_url}")

    uri = URI(releases_url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    request = Net::HTTP::Get.new(uri)
    request["Authorization"] = "Bearer #{access_token}"

    response = http.request(request)

    if response.code.to_i != 200
      UI.user_error!("Failed to fetch releases: #{response.code} #{response.body}")
    end

    releases_json = response.body
    releases = JSON.parse(releases_json)

    matched_release_names = []

    releases["releases"]&.each do |release|
      notes = release.dig("releaseNotes", "text") || ""
      if notes.include?("PR ##{pr_number}")
        matched_release_names << release["name"]
      end
    end

    if matched_release_names.empty?
      UI.message("⚠️ No releases found for PR ##{pr_number}")
      return
    end

    UI.message("🗑️ Found #{matched_release_names.size} releases to delete")

    # Step 3: Call batchDelete API
    batch_delete_url = "https://firebaseappdistribution.googleapis.com/v1/projects/#{project_number}/apps/#{app_id}/releases:batchDelete"
    body = { names: matched_release_names }.to_json

    token = access_token
    body_json = body

    command = %Q(
      curl -s -X POST "#{batch_delete_url}" \\
      -H "Authorization: Bearer #{token}" \\
      -H "Content-Type: application/json" \\
      -d '#{body_json}'
    )

    output = `#{command}`

    UI.message("API call completed.")
    UI.message("✅ Response from batchDelete: #{response}")
  end
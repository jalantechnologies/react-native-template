require 'spaceship'
require 'base64'
require 'fastlane'
require 'fastlane_core/ui/ui'

def ios_cleanup_preview!(pr_number:, app_identifier:, api_key_id:, issuer_id:, api_key_b64:)
  # Decode API key
  decoded_key = Base64.decode64(api_key_b64)

  # Authenticate using App Store Connect API
  token = Spaceship::ConnectAPI::Token.create(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key: decoded_key
  )
  Spaceship::ConnectAPI.token = token

  app = Spaceship::ConnectAPI::App.find(app_identifier)
  FastlaneCore::UI.user_error!("App '#{app_identifier}' not found!") unless app

  # Fetch builds without includes
  builds = app.get_builds(limit: 200)
  builds.each do |build|
    build_version_str = build.version.to_s
    if build_version_str.end_with?(pr_number.to_s)
      FastlaneCore::UI.message("🧹 Expiring build #{build_version_str} (#{build.id}) for PR ##{pr_number}")
      begin
        build = Spaceship::ConnectAPI::Build.get(build_id: build.id)

        unless build
          FastlaneCore::UI.user_error!("Build with ID #{build.id} not found.")
        end
        build.expire!
        FastlaneCore::UI.success("Successfully expired build ID: #{build.id}")
      rescue StandardError => e
        FastlaneCore::UI.error("Failed to expire build ID #{build.id}: #{e.message}")
      end
    end
  end
end

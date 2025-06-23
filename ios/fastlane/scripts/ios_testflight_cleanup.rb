require 'spaceship'
require 'base64'
  require 'fastlane'
  require 'fastlane_core/ui/ui'

def ios_testflight_cleanup!(pr_number:, app_identifier:, api_key_id:, issuer_id:, api_key_b64:)
  # Decode API key
  decoded_key = Base64.decode64(api_key_b64)

  # Authenticate using App Store Connect API
  token = Spaceship::ConnectAPI::Token.create(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key: decoded_key
  )
  Spaceship::ConnectAPI.token = token

  # Find the app
  app = Spaceship::ConnectAPI::App.find(app_identifier)
  UI.user_error!("App '#{app_identifier}' not found!") unless app

  # Fetch builds without includes
  builds = app.get_builds(limit: 200)

  builds.each do |build|
    build_version_str = build.version.to_s
    if build_version_str.include?("1237")
      FastlaneCore::UI.message("🧹 Expiring build #{build_version_str} (#{build.id}) for PR ##{pr_number}")
      begin
        sh("fastlane pilot expire_build --app_identifier '#{app_identifier}' --version 1.0 --build_number 202506231457")
        FastlaneCore::UI.success("✅ Expired build #{build_version_str}")
      rescue => e
        FastlaneCore::UI.error("❌ Failed to expire build #{build.version}: #{e}")
      end
    end
  end
end

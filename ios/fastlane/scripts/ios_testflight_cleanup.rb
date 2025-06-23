require 'spaceship'

def ios_testflight_cleanup!(pr_number:, app_identifier:, api_key_id:, issuer_id:, api_key_b64:)
  require 'base64'

  # Decode API Key
  decoded_key = Base64.decode64(api_key_b64)

  # Authenticate with App Store Connect API
  api_key = Spaceship::ConnectAPI::Token.create(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key: decoded_key
  )

  Spaceship::ConnectAPI.token = api_key
  # Fetch app
  app = Spaceship::ConnectAPI::App.find(app_identifier)
  UI.user_error!("App '#{app_identifier}' not found!") unless app

  builds = Spaceship::ConnectAPI.get_builds(app_id: app.id).all

  builds.each do |build|
    if build.version.include?(pr_number)
      UI.message("🚮 Deleting build #{build.version} (#{build.id}) for PR ##{pr_number}")
      begin
        build.delete!
      rescue => e
        UI.error("❌ Failed to delete build #{build.version}: #{e}")
      end
    end
  end
end

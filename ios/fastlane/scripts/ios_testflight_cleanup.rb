require 'spaceship'

def ios_testflight_cleanup!(pr_number:, app_identifier:, api_key_id:, issuer_id:, api_key_b64:)
  raise "PR_NUMBER is required" if pr_number.to_s.strip.empty?
  raise "Missing API credentials" if [api_key_id, issuer_id, api_key_b64].any?(&:nil?)

  Spaceship::ConnectAPI.login_with_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key: Base64.decode64(api_key_b64),
  )

  app = Spaceship::ConnectAPI::App.find(app_identifier)
  builds = Spaceship::ConnectAPI::Build.all(app_id: app.id, includes: "preReleaseVersion")

  target_build = builds.find do |build|
    build.attributes["buildNumber"].to_s.include?(pr_number)
  end

  if target_build
    UI.message("🗑️ Deleting build #{target_build.version} (#{target_build.build_number}) for PR ##{pr_number}")
    target_build.delete!
    UI.success("✅ Build deleted successfully.")
  else
    UI.important("⚠️ No matching build found for PR ##{pr_number}")
  end
end
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

  # Only fetch builds that match the PR number in build version
  # NOTE: App Store Connect API does not allow direct substring filtering on build number
  #       so we still fetch builds for the app but keep limit low
  builds = app.get_builds(limit: 50) # reduced limit for speed

  builds.select { |b| b.version.to_s.end_with?(".#{pr_number}") }.each do |build|
    FastlaneCore::UI.message("Found old build #{build.version} (#{build.id}) for PR ##{pr_number}")
    begin
      build = Spaceship::ConnectAPI::Build.get(build_id: build.id)

      unless build
        FastlaneCore::UI.error("Build with ID #{build.id} not found.")
        next
      end

      # Expire older builds
      begin
        build.expire!
        FastlaneCore::UI.success("Expired build #{build.id}")
      rescue => e
        FastlaneCore::UI.error("Failed to expire build #{build.id}: #{e.message}")
      end

      # Delete older builds if possible
      if build.respond_to?(:delete!)
        begin
          build.delete!
          FastlaneCore::UI.success("Deleted build #{build.id}")
        rescue => e
          FastlaneCore::UI.error("Failed to delete build #{build.id}: #{e.message}")
        end
      else
        FastlaneCore::UI.message("API does not support deleting this build — expired only.")
      end

    rescue => e
      FastlaneCore::UI.error("Error handling build #{build.id}: #{e.message}")
    end
  end
end

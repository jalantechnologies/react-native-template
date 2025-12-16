require 'fastlane_core/ui/ui'
UI = FastlaneCore::UI unless defined?(UI)

def ios_deploy_production!(options = {})
  require 'base64'
  require 'json'
  require 'fastlane'

  app_identifier   = options.fetch(:app_identifier)
  workspace        = options.fetch(:workspace)
  scheme           = options.fetch(:scheme)
  api_key_id       = options.fetch(:api_key_id)
  issuer_id        = options.fetch(:issuer_id)
  api_key_b64      = options.fetch(:api_key_b64)
  keychain_name    = options.fetch(:keychain_name)
  keychain_password= options.fetch(:keychain_password)
  team_id          = options.fetch(:team_id)

  # Version from package.json
  package_json_path = File.expand_path('../../../package.json', __dir__)
  package_json      = JSON.parse(File.read(package_json_path))
  marketing_version = package_json['version']
  UI.user_error!("❌ Version not found in package.json") unless marketing_version
  UI.message("📱 Production marketing version: #{marketing_version}")

  # Shared changelog file (same as preview)
  changelog_path = File.expand_path('../changelog.txt', __dir__)
  UI.message("🔍 Production changelog path: #{changelog_path}")
  UI.message("📂 Exists? #{File.exist?(changelog_path)}")

  changelog_content = if File.exist?(changelog_path)
    raw = File.read(changelog_path).strip
    if raw.empty?
      UI.important("⚠️ Production changelog file is empty; release notes will be skipped.")
      nil
    else
      UI.message("📝 Raw production changelog (#{raw.length} chars): #{raw[0..200]}#{raw.length > 200 ? '...' : ''}")

      # App Store "What’s New" hard limit (500 chars)
      max_len = 500
      if raw.length > max_len
        truncated = raw[0...max_len]
        UI.important("⚠️ Production changelog is #{raw.length} chars; truncating to #{max_len} for App Store.")
        truncated
      else
        raw
      end
    end
  else
    UI.important("⚠️ No production changelog file found; App Store release notes will be skipped.")
    nil
  end


  # Ensure Xcode bundle id matches profiles
  update_app_identifier(
    xcodeproj: "Boilerplate.xcodeproj",
    plist_path: "Boilerplate/Info.plist",
    app_identifier: app_identifier
  )

  # Signing assets
  UI.message("🔐 Setting up keychain & match for production...")
  create_keychain(
    name: keychain_name,
    password: keychain_password,
    default_keychain: true,
    unlock: true,
    timeout: 3600,
    lock_when_sleeps: false
  )

  match(
    type: "appstore",
    app_identifier: app_identifier,
    readonly: true,
    verbose: true,
    keychain_name: keychain_name,
    keychain_password: keychain_password,
    team_id: team_id
  )

  profile_name = "match AppStore #{app_identifier}"
  UI.message("✅ Using provisioning profile: #{profile_name}")

  # App Store Connect API key
  api_key = app_store_connect_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key_content: api_key_b64,
    is_key_content_base64: true
  )

  # Set marketing version in Xcode
  UI.message("🧾 Setting iOS marketing version in Xcode: #{marketing_version}")
  increment_version_number(
    xcodeproj: "Boilerplate.xcodeproj",
    version_number: marketing_version
  )
  latest_app_store_build = begin
    app_store_build_number(
      app_identifier: app_identifier,
      version: marketing_version,
      platform: "ios",
      api_key: api_key
    )
  rescue StandardError
    nil
  end

  next_build_number = ((latest_app_store_build || 0).to_i + 1).to_s

  UI.message("📈 Setting iOS build number via App Store Connect: #{next_build_number} (previous: #{latest_app_store_build || 'none'})")
  increment_build_number(
    xcodeproj: "Boilerplate.xcodeproj",
    build_number: next_build_number
  )

  # Build IPA for production
  UI.message("🏗️ Building production IPA...")
  build_app(
    workspace: workspace,
    scheme: scheme,
    clean: true,
    configuration: "Release",
    export_method: "app-store",
    xcargs: "CODE_SIGN_STYLE=Manual CODE_SIGN_IDENTITY=\"Apple Distribution\" DEVELOPMENT_TEAM=#{team_id} PROVISIONING_PROFILE_SPECIFIER=\"#{profile_name}\" PRODUCT_BUNDLE_IDENTIFIER=#{app_identifier}",
    export_options: {
      compileBitcode: false,
      signingStyle: "manual",
      provisioningProfiles: {
        app_identifier => profile_name
      }
    }
  )

  # # Set App Store release notes ("What's New") if changelog is present
  # if changelog_content && !changelog_content.empty?
  #   UI.message("📝 Setting App Store release notes for version #{marketing_version}...")
  #   set_changelog(
  #     app_identifier: app_identifier,
  #     version: marketing_version,
  #     changelog: changelog_content,
  #     api_key: api_key,
  #     platform: 'ios'
  #   )
  # else
  #   UI.important("⚠️ Skipping set_changelog because no production changelog content was provided.")
  # end

  # Upload IPA to App Store Connect
  UI.message("☁️ Uploading IPA to App Store Connect...")
  upload_to_app_store(
    app_identifier: app_identifier,
    skip_screenshots: true,
    skip_metadata: true,          # metadata already handled by set_changelog
    skip_app_version_update: true,
    force: true,
    precheck_include_in_app_purchases: false,
    release_notes: {
      'en-US' => changelog_content, 
      'default' => changelog_content 
    }
  )

  UI.success("✅ Production upload complete! Version #{marketing_version} (#{next_build})")
ensure
  UI.message("🧹 Cleaning up production keychain...")
  begin
    delete_keychain(name: keychain_name)
  rescue => e
    UI.message("⚠️ Keychain cleanup failed: #{e.message}")
  end
end

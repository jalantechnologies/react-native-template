require 'fastlane_core/ui/ui'
UI = FastlaneCore::UI unless defined?(UI)

def ios_deploy_production!(options = {})
  require 'base64'
  require 'json'
  require 'fastlane'

  app_identifier = options.fetch(:app_identifier)
  workspace = options.fetch(:workspace)
  scheme = options.fetch(:scheme)
  api_key_id = options.fetch(:api_key_id)
  issuer_id = options.fetch(:issuer_id)
  api_key_b64 = options.fetch(:api_key_b64)
  keychain_name = options.fetch(:keychain_name)
  keychain_password = options.fetch(:keychain_password)
  team_id = options.fetch(:team_id)

  package_json_path = File.expand_path('../../../package.json', __dir__)
  package_json = JSON.parse(File.read(package_json_path))
  marketing_version = package_json['version']

  UI.user_error!("❌ Version not found in package.json") unless marketing_version

  # Ensure the Xcode project uses the bundle identifier that matches the
  # provisioned profiles before resolving signing assets.
  update_app_identifier(
    xcodeproj: "Boilerplate.xcodeproj",
    plist_path: "Boilerplate/Info.plist",
    app_identifier: app_identifier
  )

  # Ensure signing assets are present for the build.
  match(
    type: "appstore",
    readonly: true,
    verbose: true,
    keychain_name: keychain_name,
    keychain_password: keychain_password
  )

  profile_env_key = app_identifier.tr('.', '_')
  profile_path = ENV["sigh_#{profile_env_key}_appstore_profile-path"] || lane_context[SharedValues::SIGH_PROFILE_PATH]
  UI.user_error!("❌ Unable to locate provisioning profile path from match") unless profile_path && File.exist?(profile_path)

  profile_name = ENV["sigh_#{profile_env_key}_appstore_profile-name"] || "match AppStore #{app_identifier}"

  # Force manual signing in the Xcode project so the matched provisioning
  # profile is honored during the archive.
  update_project_provisioning(
    xcodeproj: "Boilerplate.xcodeproj",
    profile: profile_path,
    target_filter: "^Boilerplate$",
    build_configuration: "Release",
    code_signing_identity: "Apple Distribution",
    use_automatic_signing: false,
    team_id: team_id
  )

  app_store_connect_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key_content: api_key_b64,
    is_key_content_base64: true,
  )

  UI.message("🧾 Setting iOS marketing version from package.json: #{marketing_version}")
  increment_version_number(
    xcodeproj: "Boilerplate.xcodeproj",
    version_number: marketing_version
  )

  latest_build_number = begin
    latest_testflight_build_number(
      app_identifier: app_identifier,
      version: marketing_version,
      platform: "ios"
    )
  rescue StandardError
    nil
  end

  next_build_number = (latest_build_number || 0).to_i + 1

  UI.message("📈 Setting iOS build number to #{next_build_number} for version #{marketing_version}")
  increment_build_number(
    xcodeproj: "Boilerplate.xcodeproj",
    build_number: next_build_number
  )

  # Build IPA for production
  build_app(
    workspace: workspace,
    scheme: scheme,
    clean: true,
    configuration: "Release",
    export_method: "app-store",
    xcargs: "CODE_SIGN_STYLE=Manual CODE_SIGN_IDENTITY='Apple Distribution' DEVELOPMENT_TEAM=#{team_id} PROVISIONING_PROFILE_SPECIFIER='#{profile_name}' PRODUCT_BUNDLE_IDENTIFIER=#{app_identifier}",
    export_options: {
      compileBitcode: false,
      signingStyle: "manual",
      provisioningProfiles: {
        app_identifier => profile_name
      }
    }
  )

  # Upload IPA to App Store (for distribution)
  upload_to_app_store(
    changelog: "App uploaded via CI/CD",
    skip_screenshots: true,
    skip_metadata: true,
    skip_app_version_update: true,
    force: true,
    precheck_include_in_app_purchases: false,
  )
end


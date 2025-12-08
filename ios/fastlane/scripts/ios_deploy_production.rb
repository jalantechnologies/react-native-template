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
  
  # For App Store, read from metadata/en-US/release_notes.txt (not changelog.txt)
  release_notes_path = File.expand_path('../metadata/en-US/release_notes.txt', __dir__)
  UI.user_error!("❌ Release notes file not found at: #{release_notes_path}. Ensure release_notes.txt exists in metadata/en-US/") unless File.exist?(release_notes_path)

  release_notes = File.read(release_notes_path).strip
  UI.user_error!("❌ Release notes file at #{release_notes_path} is empty. Please provide release notes before building.") if release_notes.empty?

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

  profile_name = "match AppStore #{app_identifier}"

  app_store_connect_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key_content: api_key_b64,
    is_key_content_base64: true,
  )

  # REMOVED: set_changelog is not needed when using upload_to_app_store with metadata_path
  # The release_notes.txt in metadata folder will be used automatically

  UI.message("🧾 Setting iOS marketing version from package.json: #{marketing_version}")
  increment_version_number(
    xcodeproj: "Boilerplate.xcodeproj",
    version_number: marketing_version
  )

  latest_testflight = begin
    latest_testflight_build_number(
      app_identifier: app_identifier,
      version: marketing_version,
      platform: "ios"
    )
  rescue StandardError
    nil
  end

  latest_app_store = begin
    app_store_build_number(
      app_identifier: app_identifier,
      version: marketing_version,
      platform: "ios"
    )
  rescue StandardError
    nil
  end

  sanitize_build_number = lambda do |build|
    next nil unless build

    digits_only = build.to_s.scan(/\d+/).join
    digits_only.empty? ? nil : digits_only.to_i
  end

  existing_builds = [latest_testflight, latest_app_store].map { |build| sanitize_build_number.call(build) }.compact
  highest_existing_build = existing_builds.max
  timestamp_build = Time.now.utc.strftime('%Y%m%d%H%M%S').to_i
  next_build_number = [timestamp_build, (highest_existing_build || 0) + 1].max

  UI.message(
    "📈 Setting iOS build number to #{next_build_number} for version #{marketing_version} " \
    "(latest TestFlight: #{latest_testflight || 'none'}, latest App Store: #{latest_app_store || 'none'})"
  )
  increment_build_number(
    xcodeproj: "Boilerplate.xcodeproj",
    build_number: next_build_number.to_s
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

  # Upload IPA to App Store
  # The metadata_path will automatically use release_notes.txt from metadata/en-US/
  upload_to_app_store(
    skip_screenshots: true,
    skip_metadata: false,           # Must be false to upload release notes
    skip_app_version_update: true,
    force: true,
    precheck_include_in_app_purchases: false,
    metadata_path: "./metadata"     # Points to fastlane/metadata folder
  )
  
  UI.success("✅ Production build uploaded successfully with release notes from #{release_notes_path}")
end
require 'fastlane_core/ui/ui'
UI = FastlaneCore::UI unless defined?(UI)

def ios_deploy_production!(options = {})
  require 'base64'
  require 'fileutils'
  require 'json'
  require 'fastlane'
  require 'spaceship'
  require_relative 'release_notes_helper'

  # ---------------------------------------------------------------------------
  # Inputs
  # ---------------------------------------------------------------------------
  app_identifier    = options.fetch(:app_identifier)
  xcodeproj         = options.fetch(:xcodeproj)
  workspace         = options.fetch(:workspace)
  scheme            = options.fetch(:scheme)
  api_key_id        = options.fetch(:api_key_id)
  issuer_id         = options.fetch(:issuer_id)
  api_key_b64       = options.fetch(:api_key_b64)
  keychain_name     = options.fetch(:keychain_name)
  keychain_password = options.fetch(:keychain_password)
  team_id           = options.fetch(:team_id)
  release_notes     = options.fetch(:release_notes)
  plist_path        = options.fetch(:plist_path)

  # ---------------------------------------------------------------------------
  # Version from package.json
  # ---------------------------------------------------------------------------
  package_json_path = File.expand_path('../../../package.json', __dir__)
  package_json      = JSON.parse(File.read(package_json_path))
  marketing_version = package_json['version']
  UI.user_error!('❌ Version not found in package.json') unless marketing_version
  UI.message("📱 Production marketing version: #{marketing_version}")

  # ---------------------------------------------------------------------------
  # Ensure Xcode bundle id matches profiles
  # ---------------------------------------------------------------------------
  update_app_identifier(
    xcodeproj: xcodeproj,
    plist_path: plist_path,
    app_identifier: app_identifier
  )

  # ---------------------------------------------------------------------------
  # Signing assets (keychain + match)
  # ---------------------------------------------------------------------------
  UI.message('🔐 Setting up keychain & match for production...')
  create_keychain(
    name: keychain_name,
    password: keychain_password,
    default_keychain: true,
    unlock: true,
    timeout: 3600,
    lock_when_sleeps: false
  )

  match(
    type: 'appstore',
    app_identifier: app_identifier,
    readonly: true,
    verbose: true,
    keychain_name: keychain_name,
    keychain_password: keychain_password,
    team_id: team_id
  )

  profile_name = "match AppStore #{app_identifier}"
  UI.message("✅ Using provisioning profile: #{profile_name}")

  # ---------------------------------------------------------------------------
  # App Store Connect API key
  # ---------------------------------------------------------------------------
  api_key = app_store_connect_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key_content: api_key_b64,
    is_key_content_base64: true
  )

  # Ensure Spaceship uses the same API key for Connect API calls below.
  # Older fastlane versions return a Hash; newer versions return a Token-like object.
  Spaceship::ConnectAPI.token =
    if api_key.respond_to?(:token)
      api_key
    elsif api_key.is_a?(Hash)
      key_content = api_key[:key] || api_key['key']
      if (api_key[:is_key_content_base64] || api_key['is_key_content_base64']) && key_content
        key_content = Base64.decode64(key_content)
      end
      UI.user_error!('❌ ASC API key content is missing') if key_content.to_s.strip.empty?

      in_house = api_key.key?(:in_house) ? api_key[:in_house] : api_key['in_house']
      in_house = false if in_house.nil?

      Spaceship::ConnectAPI::Token.create(
        key_id: api_key[:key_id] || api_key['key_id'],
        issuer_id: api_key[:issuer_id] || api_key['issuer_id'],
        key: key_content,
        filepath: api_key[:filepath] || api_key['filepath'],
        duration: api_key[:duration] || api_key['duration'],
        in_house: in_house
      )
    else
      UI.user_error!("❌ Unexpected api_key type: #{api_key.class}")
    end

  # ---------------------------------------------------------------------------
  # Guard: block deploy if any version is currently in review
  # ---------------------------------------------------------------------------
  app = Spaceship::ConnectAPI::App.find(app_identifier)
  versions = app.get_app_store_versions(filter: { platform: 'IOS' })

  state_of = lambda do |v|
    v.respond_to?(:app_store_state) ? v.app_store_state : v.app_version_state
  end

  review_states   = %w[WAITING_FOR_REVIEW IN_REVIEW PENDING_APPLE_REVIEW]
  editable_states = %w[PREPARE_FOR_SUBMISSION DEVELOPER_REJECTED REJECTED METADATA_REJECTED READY_FOR_REVIEW]

  pending_reviews = versions.select { |v| review_states.include?(state_of.call(v)) }
  unless pending_reviews.empty?
    states = pending_reviews.map { |v| "#{v.version_string} (#{state_of.call(v)})" }.join(', ')
    UI.user_error!("❌ App Store has version(s) in review: #{states}. Remove from review or wait until they finish before deploying.")
  end

  target_version = versions.find { |v| v.version_string == marketing_version }
  if target_version
    state = state_of.call(target_version)
    unless editable_states.include?(state)
      UI.user_error!("❌ App Store version #{marketing_version} exists but is in state #{state}, which is not editable. Bump the version in package.json or move it to Prepare for Submission.")
    end
    UI.message("📌 Using existing App Store version #{marketing_version} (state: #{state}).")
  else
    UI.message("🆕 No App Store version #{marketing_version} found; letting upload_to_app_store create it in 'Prepare for Submission'.")
  end

  # ---------------------------------------------------------------------------
  # Set marketing version + compute production build number from it
  # ---------------------------------------------------------------------------
  UI.message("🧾 Setting iOS marketing version from package.json: #{marketing_version}")
  increment_version_number(
    xcodeproj: xcodeproj,
    version_number: marketing_version
  )

  # Encode marketing_version (e.g. "1.0.13" -> "1013")
  major, minor, patch = marketing_version.split('.').map(&:to_i)
  minor ||= 0
  patch ||= 0
  # Use positional encoding to avoid collisions between different semantic versions
  base_build = major * 1_000_000 + minor * 1_000 + patch
  final_build = [base_build, 1].max

  UI.message("📈 Using PRODUCTION build number: #{final_build}")

  # For production, use the following increment logic, comment it out when testing any changes to this script.
  increment_build_number(
    xcodeproj: xcodeproj,
    build_number: final_build.to_s
  )

  # # Uncomment this method and use the hardcoded build numbers to test any changes to production, so it will 
  # # separate actual production build and test production builds
  # increment_build_number(
  #   xcodeproj: xcodeproj,
  #   build_number: 1
  # )

  # ---------------------------------------------------------------------------
  # Release notes (App Store "What's New")
  # ---------------------------------------------------------------------------
  app_store_release_notes = build_app_store_release_notes(release_notes)
  release_notes_path = File.join(
    __dir__,
    '..',
    'metadata',
    'en-US',
    'release_notes.txt'
  )
  FileUtils.mkdir_p(File.dirname(release_notes_path))
  File.write(release_notes_path, app_store_release_notes)

  written_content = File.read(release_notes_path)
  UI.message("📝 Wrote App Store release notes at: #{release_notes_path}")
  UI.message("📝 Written content for release notes: #{written_content}")

  # ---------------------------------------------------------------------------
  # Bundle and Verify React Native for iOS (production env)
  # ---------------------------------------------------------------------------
  envfile_path = File.expand_path('../../../.env', __dir__)
  ENV['ENVFILE']  = envfile_path
  ENV['NODE_ENV'] = 'production'
  repo_root = File.expand_path('../../..', __dir__)

  UI.message('📦 Bundling React Native for iOS (production)...')

  sh <<~BASH
    cd "#{repo_root}"    
    ENVFILE=.env NODE_ENV=production npx react-native bundle \\
      --entry-file index.js \\
      --platform ios \\
      --dev false \\
      --bundle-output ios/main.jsbundle \\
      --assets-dest .
    
    echo "✅ Bundle complete"
  BASH

  js_bundle_path = File.expand_path('../../main.jsbundle', __dir__)
  UI.message("🔍 Checking for main.jsbundle at: #{js_bundle_path}")
  UI.user_error!('❌ main.jsbundle not found') unless File.exist?(js_bundle_path)

  # ---------------------------------------------------------------------------
  # Build IPA for production
  # ---------------------------------------------------------------------------
  UI.message('🏗️ Building production IPA...')
  build_app(
    workspace: workspace,
    scheme: scheme,
    clean: true,
    configuration: 'Release',
    export_method: 'app-store',
    xcargs: "CODE_SIGN_STYLE=Manual CODE_SIGN_IDENTITY=\"Apple Distribution\" " \
            "DEVELOPMENT_TEAM=#{team_id} " \
            "PROVISIONING_PROFILE_SPECIFIER=\"#{profile_name}\" " \
            "PRODUCT_BUNDLE_IDENTIFIER=#{app_identifier}",
    export_options: {
      compileBitcode: false,
      signingStyle: 'manual',
      provisioningProfiles: {
        app_identifier => profile_name
      }
    }
  )

  # ---------------------------------------------------------------------------
  # Hermes bitcode stripping + re-sign
  # ---------------------------------------------------------------------------
  ipa_path = lane_context[:IPA_OUTPUT_PATH]
  UI.message("📦 Processing IPA: #{ipa_path}")
  UI.user_error!('❌ IPA path missing in lane_context') unless ipa_path && File.exist?(ipa_path)

  sh('unzip -q ' + ipa_path + ' -d temp_payload')
  app_path = Dir['temp_payload/Payload/*.app'].first
  UI.user_error!('❌ .app bundle not found') unless app_path

  hermes_bin = File.join(app_path, 'Frameworks/hermes.framework/hermes')
  sh <<~BASH
    echo "🔍 Stripping Hermes bitcode..."
    if [ -f "#{hermes_bin}" ]; then
      echo "📦 Found Hermes: #{hermes_bin}"
      xcrun bitcode_strip -r "#{hermes_bin}" -o "#{hermes_bin}"

      echo "🔬 Verifying..."
      if otool -l "#{hermes_bin}" | grep -i bitcode; then
        echo "❌ Bitcode still present!"
        exit 1
      fi
      echo "✅ Bitcode stripped"

      echo "🔐 Re-signing..."
      CERT_ID=$(security find-identity -v -p codesigning "#{keychain_name}" | grep "Apple Distribution" | head -n1 | awk '{print $2}')

      if [ -z "$CERT_ID" ]; then
        echo "❌ No Apple Distribution cert found!"
        exit 1
      fi

      echo "Using cert: $CERT_ID"

      for FRAMEWORK in "#{app_path}/Frameworks/"*; do
        if [ -d "$FRAMEWORK" ]; then
          /usr/bin/codesign --force --sign "$CERT_ID" --timestamp=none --generate-entitlement-der "$FRAMEWORK"
        fi
      done

      /usr/bin/codesign --force --sign "$CERT_ID" \
        --timestamp=none \
        --preserve-metadata=entitlements \
        --generate-entitlement-der \
        "#{app_path}"

      echo "🔬 Verifying signature..."
      /usr/bin/codesign --verify --deep --strict --verbose=2 "#{app_path}"
      echo "✅ Signing complete"
    else
      echo "⚠️ Hermes not found: #{hermes_bin}"
    fi

    echo "📦 Repacking IPA..."
    cd temp_payload && zip -r -q ../fixed.ipa Payload >/dev/null && cd ..
    mv fixed.ipa "#{ipa_path}"
    rm -rf temp_payload
    echo "✅ IPA ready"
  BASH

  # ---------------------------------------------------------------------------
  # Upload IPA to App Store Connect
  # ---------------------------------------------------------------------------
    # EXPECTATION (per project):
  #   - Default language folder exists: ios/fastlane/metadata/en-US/
  #   - This script will overwrite release_notes.txt for each release.
  #   - All other metadata (description, URLs, screenshots) is managed manually
  #     in App Store Connect.
  # Ensure the app has at least one released version; Apple ignores “What’s New” for the very first version, 
  # and Fastlane logs Skipping 'release_notes'... this is the first version of the app.
  UI.message('☁️ Uploading IPA to App Store Connect...')
  upload_to_app_store(
    api_key: api_key,
    app_identifier: app_identifier,
    app_version: marketing_version,
    ipa: ipa_path,
    metadata_path: File.join(__dir__, '..', 'metadata'),
    skip_screenshots: true,
    skip_metadata: false,
    skip_app_version_update: false,
    submit_for_review: false,
    force: true,
    precheck_include_in_app_purchases: false,
    release_notes: {                           # optional override
      'default' => app_store_release_notes,
      'en-US'   => app_store_release_notes
    }
  )

  UI.success("✅ Production upload complete! Version #{marketing_version} (#{final_build})")
ensure
  if defined?(keychain_name) && keychain_name
    UI.message('🧹 Cleaning up production keychain...')
    begin
      delete_keychain(name: keychain_name)
    rescue => e
      UI.message("⚠️ Keychain cleanup failed: #{e.message}")
    end
  end
end

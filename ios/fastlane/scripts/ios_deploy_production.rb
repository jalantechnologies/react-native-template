require 'fastlane_core/ui/ui'
UI = FastlaneCore::UI unless defined?(UI)

def ios_deploy_production!(options = {})
  require 'base64'
  require 'json'
  require 'fastlane'

  # ---------------------------------------------------------------------------
  # Inputs
  # ---------------------------------------------------------------------------
  app_identifier    = options.fetch(:app_identifier)
  workspace         = options.fetch(:workspace)
  scheme            = options.fetch(:scheme)
  api_key_id        = options.fetch(:api_key_id)
  issuer_id         = options.fetch(:issuer_id)
  api_key_b64       = options.fetch(:api_key_b64)
  keychain_name     = options.fetch(:keychain_name)
  keychain_password = options.fetch(:keychain_password)
  team_id           = options.fetch(:team_id)

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
    xcodeproj: 'Boilerplate.xcodeproj',
    plist_path: 'Boilerplate/Info.plist',
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

  # ---------------------------------------------------------------------------
  # Set marketing version + compute next build number (App Store only)
  # ---------------------------------------------------------------------------
  UI.message("🧾 Setting iOS marketing version from package.json: #{marketing_version}")
  increment_version_number(
    xcodeproj: 'Boilerplate.xcodeproj',
    version_number: marketing_version
  )

  UI.message('🔢 Fetching latest App Store build number for this version...')
  latest_app_store_build = begin
    app_store_build_number(
      app_identifier: app_identifier,
      version: marketing_version,
      platform: 'ios',
      api_key: api_key
    )
  rescue StandardError => e
    UI.important("⚠️ Could not fetch App Store build number for #{marketing_version}: #{e.message}")
    nil
  end

  numeric_latest = if latest_app_store_build
    digits = latest_app_store_build.to_s.scan(/\d+/).join
    digits.empty? ? 0 : digits.to_i
  else
    0
  end

  next_build_number = (numeric_latest + 1).to_s

  UI.message(
    "📈 Using production build number: #{next_build_number} " \
    "(previous App Store build: #{latest_app_store_build || 'none'})"
  )

  increment_build_number(
    xcodeproj: 'Boilerplate.xcodeproj',
    build_number: next_build_number
  )

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
  UI.message('☁️ Uploading IPA to App Store Connect...')
  upload_to_app_store(
    app_identifier: app_identifier,
    skip_screenshots: true,
    skip_metadata: true,         
    skip_app_version_update: true,
    force: true,
    precheck_include_in_app_purchases: false
  )

  UI.success("✅ Production upload complete! Version #{marketing_version} (#{next_build_number})")
ensure
  UI.message('🧹 Cleaning up production keychain...')
  begin
    delete_keychain(name: keychain_name)
  rescue => e
    UI.message("⚠️ Keychain cleanup failed: #{e.message}")
  end
end

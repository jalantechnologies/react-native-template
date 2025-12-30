require 'fastlane_core/ui/ui'
UI = FastlaneCore::UI unless defined?(UI)

def ios_deploy_preview!(options = {})
  require 'fileutils'
  require 'base64'
  require 'json'
  require 'fastlane'
  require_relative 'release_notes_helper'

  # ---------------------------------------------------------------------------
  # Required inputs
  # ---------------------------------------------------------------------------
  pr_number         = options.fetch(:pr_number)
  app_identifier    = options.fetch(:app_identifier)
  xcodeproj         = options.fetch(:xcodeproj)
  scheme            = options.fetch(:scheme)
  api_key_id        = options.fetch(:api_key_id)
  issuer_id         = options.fetch(:issuer_id)
  api_key_b64       = options.fetch(:api_key_b64)
  keychain_name     = options.fetch(:keychain_name)
  keychain_password = options.fetch(:keychain_password)
  apple_id          = options.fetch(:apple_id)
  username          = options.fetch(:username)
  team_id           = options.fetch(:team_id)
  release_notes     = options.fetch(:release_notes)

  # ---------------------------------------------------------------------------
  # Version (from package.json)
  # ---------------------------------------------------------------------------
  package_json_path = File.expand_path('../../../package.json', __dir__)
  package_json      = JSON.parse(File.read(package_json_path))
  marketing_version = package_json['version']
  UI.user_error!("❌ Version not found in package.json") unless marketing_version
  UI.message("📱 Preview marketing version: #{marketing_version}")

  # ---------------------------------------------------------------------------
  # Cleanup old preview builds for this PR
  # ---------------------------------------------------------------------------
  UI.message("🧹 Cleaning old builds for PR ##{pr_number}...")
  require_relative 'ios_cleanup_preview'
  ios_cleanup_preview!(
    pr_number: pr_number,
    app_identifier: app_identifier,
    api_key_id: api_key_id,
    issuer_id: issuer_id,
    api_key_b64: api_key_b64
  )

  # ---------------------------------------------------------------------------
  # Keychain + match (signing)
  # ---------------------------------------------------------------------------
  UI.message("🔐 Setting up keychain: #{keychain_name}")
  create_keychain(
    name: keychain_name,
    password: keychain_password,
    default_keychain: true,
    unlock: true,
    timeout: 3600,
    lock_when_sleeps: false
  )

  UI.message("📦 Fetching signing certificates and profiles...")
  profile_name = "match AppStore #{app_identifier}"
  match(
    type: "appstore",
    app_identifier: app_identifier,
    readonly: true,
    verbose: true,
    keychain_name: keychain_name,
    keychain_password: keychain_password,
    team_id: team_id
  )
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
  # Marketing version + PR‑based build number
  # ---------------------------------------------------------------------------
  UI.message("📱 Setting marketing version: #{marketing_version}")
  increment_version_number(
    xcodeproj: xcodeproj,
    version_number: marketing_version
  )

  # Build number pattern: <PR_NUMBER><YYMMDDHHMM>
  # Example: PR 42 on 2025-12-17 10:58 UTC → 422512171058
  pr_digits = pr_number.to_s.gsub(/[^0-9]/, '')
  UI.user_error!("❌ Invalid PR number '#{pr_number}'") if pr_digits.empty?

  timestamp = Time.now.utc.strftime('%y%m%d%H%M') # 10 digits
  next_build = "#{pr_digits}#{timestamp}"

  # App Store limit: max 18 chars for build number
  if next_build.length > 18
    next_build = next_build[-18..-1]
    UI.important("⚠️ Preview build number truncated to 18 chars: #{next_build}")
  end

  UI.message("🔢 Using preview build number: #{next_build} (PR ##{pr_number}, ts=#{timestamp})")
  increment_build_number(
    xcodeproj: xcodeproj,
    build_number: next_build
  )

  # ---------------------------------------------------------------------------
  # Bundle and Verify React Native for iOS (preview env)
  # ---------------------------------------------------------------------------
  envfile_path = File.expand_path('../../../.env', __dir__)
  ENV['ENVFILE']  = envfile_path
  ENV['NODE_ENV'] = 'production'
  repo_root = File.expand_path('../../..', __dir__)

  UI.message('📦 Bundling React Native for iOS (preview)...')
  sh <<~BASH
    cd "#{repo_root}"
    ENVFILE=.env NODE_ENV=production npx react-native bundle \\
      --entry-file index.js \\
      --platform ios \\
      --dev false \\
      --bundle-output ios/main.jsbundle \\
      --assets-dest .
  BASH

  js_bundle_path = File.expand_path('../../main.jsbundle', __dir__)
  UI.message("🔍 Checking for main.jsbundle at: #{js_bundle_path}")
  UI.user_error!('❌ main.jsbundle not found') unless File.exist?(js_bundle_path)


  # ---------------------------------------------------------------------------
  # Build IPA (Boilerplate workspace)
  # ---------------------------------------------------------------------------
  UI.message('🏗️ Building IPA...')
  build_app(
    clean: true,
    scheme: scheme,
    workspace: './Boilerplate.xcworkspace',
    export_method: 'app-store',
    verbose: true,
    xcargs: "CODE_SIGN_STYLE=Manual CODE_SIGN_IDENTITY=\"Apple Distribution\" DEVELOPMENT_TEAM=#{team_id} PROVISIONING_PROFILE_SPECIFIER=\"#{profile_name}\" PRODUCT_BUNDLE_IDENTIFIER=#{app_identifier}",
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

  sh("unzip -q #{ipa_path} -d temp_payload")
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
  # TestFlight changelog
  # ---------------------------------------------------------------------------

  UI.message("🚀 RELEASE NOTES FOUND FROM ENVIRONMENT: #{release_notes}")
    
  testflight_changelog = build_testflight_changelog(
    release_notes,
    pr_number: pr_number,
    build_number: next_build
  )

  localized_build_info = {
    "default" => { whats_new: testflight_changelog },
    "en-US"   => { whats_new: testflight_changelog }
  }

  UI.message("🚀 FINAL RELEASE NOTES: #{testflight_changelog}")

  # ---------------------------------------------------------------------------
  # Upload to TestFlight with Changelog Support
  # ---------------------------------------------------------------------------
  # PREREQUISITES (one‑time per app, done manually in App Store Connect):
  # 1. In App Store Connect → TestFlight:
  #    - Configure "Beta App Information" (description, feedback email, URLs).
  #    - Configure "Test Information" (contact info, demo account, notes).
  # 2. Create at least one External Testers group, e.g. "QA" or "Beta".
  # 3. Add testers to that group.
  #
  # After that, this script only needs:
  # - API key
  # - app_identifier
  # - groups name(s)
  # - release_notes (from CI / commit / PR)

  # IMPORTANT:
  # - Assumes Beta App Info + Test Info already configured in App Store Connect.
  # - Assumes external group "QA" exists and has testers.
  begin
    UI.message('☁️ Uploading to TestFlight...')
    upload_to_testflight(
      api_key: api_key,                 # from app_store_connect_api_key above
      app_identifier: app_identifier,
      ipa: ipa_path,

      # Per-build metadata
      changelog: testflight_changelog,  # "What to Test"
      localized_build_info: localized_build_info,

      # Distribution
      skip_waiting_for_build_processing: false,  # wait so changelog can be attached
      distribute_external: true,                 # send to external testers
      groups: ["External Testers"],    # <-- project-specific, see comment
      notify_external_testers: true,             # send email/notification
    )
    UI.success("✅ TestFlight upload complete! Build: #{next_build}")
  rescue => e
    UI.error("❌ Upload failed: #{e.message}")
    sh("rm -rf #{ipa_path}") if File.exist?(ipa_path)

    # Defensive cleanup of preview builds for this PR
    begin
      ios_cleanup_preview!(
        pr_number: pr_number,
        app_identifier: app_identifier,
        api_key_id: api_key_id,
        issuer_id: issuer_id,
        api_key_b64: api_key_b64
      )
    rescue => cleanup_error
      UI.important("⚠️ Cleanup after failed upload also failed: #{cleanup_error.message}")
    end

    raise e
  ensure
    UI.message('🧹 Cleaning up keychain...')
    begin
      delete_keychain(name: keychain_name)
    rescue => e
      UI.message("⚠️ Keychain cleanup failed: #{e.message}")
    end
  end
end

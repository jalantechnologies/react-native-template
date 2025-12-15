require 'fastlane_core/ui/ui'
UI = FastlaneCore::UI unless defined?(UI)

def ios_deploy_preview!(options = {})
  require 'fileutils'
  require 'base64'
  require 'json'
  require 'fastlane'

  # Required inputs
  pr_number = options.fetch(:pr_number)
  app_identifier = options.fetch(:app_identifier)
  xcodeproj = options.fetch(:xcodeproj)
  scheme = options.fetch(:scheme)
  api_key_id = options.fetch(:api_key_id)
  issuer_id = options.fetch(:issuer_id)
  api_key_b64 = options.fetch(:api_key_b64)
  keychain_name = options.fetch(:keychain_name)
  keychain_password = options.fetch(:keychain_password)
  apple_id = options.fetch(:apple_id)
  username = options.fetch(:username)
  team_id = options.fetch(:team_id)

  package_json_path = File.expand_path('../../../package.json', __dir__)
  package_json = JSON.parse(File.read(package_json_path))
  marketing_version = package_json['version']
  UI.user_error!("❌ Version not found in package.json") unless marketing_version

  UI.message("🧹 Cleaning old builds for PR ##{pr_number}...")
  require_relative "ios_cleanup_preview"
  ios_cleanup_preview!(
    pr_number: pr_number,
    app_identifier: app_identifier,
    api_key_id: api_key_id,
    issuer_id: issuer_id,
    api_key_b64: api_key_b64
  )

  # Setup keychain FIRST
  UI.message("🔐 Setting up keychain: #{keychain_name}")
  create_keychain(
    name: keychain_name,
    password: keychain_password,
    default_keychain: true,
    unlock: true,
    timeout: 3600,
    lock_when_sleeps: false
  )

  # Fetch certificates and profiles
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

  # Set marketing version
  UI.message("📱 Setting marketing version: #{marketing_version}")
  increment_version_number(
    xcodeproj: xcodeproj,
    version_number: marketing_version
  )

  UI.message("🔢 Fetching latest TestFlight build number...")
  api_key = app_store_connect_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key_content: api_key_b64,
    is_key_content_base64: true
  )

  latest_build = latest_testflight_build_number(
    app_identifier: app_identifier,
    api_key: api_key
  ) || 0

  # next_build = (latest_build.to_i + 1).to_s
  next_build = 1
  UI.message("📊 Latest: #{latest_build} → Next build: #{next_build}")

  increment_build_number(
    xcodeproj: xcodeproj,
    build_number: next_build
  )

  # Verify JS bundle
  Dir.chdir("..") do
    ENV["ENVFILE"] = ".env.preview"
    ENV["NODE_ENV"] = "production"
    js_bundle_path = File.expand_path("main.jsbundle")
    UI.message("🔍 JS bundle: #{js_bundle_path}")
    UI.user_error!("❌ main.jsbundle missing") unless File.exist?(js_bundle_path)
  end

  # Build IPA
  UI.message("🏗️ Building IPA...")
  build_app(
    clean: true,
    scheme: scheme,
    workspace: "./Boilerplate.xcworkspace",  
    export_method: "app-store",
    verbose: true,
    xcargs: "CODE_SIGN_STYLE=Manual CODE_SIGN_IDENTITY=\"Apple Distribution\" DEVELOPMENT_TEAM=#{team_id} PROVISIONING_PROFILE_SPECIFIER=\"match AppStore #{app_identifier}\" PRODUCT_BUNDLE_IDENTIFIER=#{app_identifier}",
    export_options: {
      compileBitcode: false,
      signingStyle: "manual",
      provisioningProfiles: {
        app_identifier => profile_name
      }
    }
  )


  # Hermes bitcode stripping
  ipa_path = lane_context[:IPA_OUTPUT_PATH]
  UI.message("📦 Processing IPA: #{ipa_path}")
  sh("unzip -q #{ipa_path} -d temp_payload")
  app_path = Dir["temp_payload/Payload/*.app"].first
  UI.user_error!("❌ .app bundle not found") unless app_path

  hermes_bin = File.join(app_path, "Frameworks/hermes.framework/hermes")
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
      
      /usr/bin/codesign --force --sign "$CERT_ID" --timestamp=none --preserve-metadata=entitlements --generate-entitlement-der "#{app_path}"
      
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

  # RELEASE NOTES
  changelog_path = File.expand_path('../changelog.txt', __dir__)
  UI.message("🔍 Changelog path: #{changelog_path}")
  UI.message("📂 Exists? #{File.exist?(changelog_path)}")

  changelog_content = if File.exist?(changelog_path)
    content = File.read(changelog_path).strip
    UI.message("📝 Raw (#{content.length} chars): #{content[0..200]}#{content.length > 200 ? '...' : ''}")
    
    content.empty? ? nil : content
  else
    UI.important("⚠️ No changelog file")
    nil
  end

  testflight_changelog = changelog_content || "PR ##{pr_number} (Build #{next_build}) - Automated preview"

  UI.message("🚀 FINAL CHANGELOG (#{testflight_changelog.length} chars):")
  UI.message("=" * 50)
  UI.message(testflight_changelog)
  UI.message("=" * 50)

  # Upload to TestFlight
  begin
    UI.message("☁️ Uploading to TestFlight...")
    upload_to_testflight(
      ipa: ipa_path,
      changelog: testflight_changelog,
      username: username,
      apple_id: apple_id,
      app_identifier: app_identifier,
      distribute_external: false
    )
    UI.success("✅ TestFlight upload complete! Build: #{next_build}")
  rescue => e
    UI.error("❌ Upload failed: #{e.message}")
    sh("rm -rf #{ipa_path}") if File.exist?(ipa_path)
    
    ios_cleanup_preview!(
      pr_number: pr_number,
      app_identifier: app_identifier,
      api_key_id: api_key_id,
      issuer_id: issuer_id,
      api_key_b64: api_key_b64
    )
    raise e
  ensure
    UI.message("🧹 Cleaning up keychain...")
    begin
      delete_keychain(name: keychain_name)
    rescue => e
      UI.message("⚠️ Keychain cleanup failed: #{e.message}")
    end
  end
end

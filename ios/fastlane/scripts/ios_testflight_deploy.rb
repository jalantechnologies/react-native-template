#!/usr/bin/env ruby
# ios_testflight_deploy.rb
#
# This script defines a `ios_testflight_deploy!` helper that:
#  • Fetches both App Store and Development certificates & profiles
#  • Increments the build number (datetime + PR)
#  • Bundles your React Native JS if necessary
#  • Archives and exports an .ipa with manual signing
#  • Strips Hermes bitcode & re-signs
#  • Uploads to TestFlight (internal only)
#
# Usage: called from your Fastfile with:
#   require_relative "scripts/ios_testflight_deploy"
#   ios_testflight_deploy!(
#     pr_number: ENV["PR_NUMBER"],
#     app_identifier: ENV["IOS_APP_IDENTIFIER"],
#     xcodeproj: "ios/YourApp.xcodeproj",
#     scheme: "YourApp",
#     api_key_id: ENV["API_KEY_ID"],
#     issuer_id: ENV["ISSUER_ID"],
#     api_key_b64: ENV["API_KEY_BASE64"],
#     keychain_name: "ci.keychain",
#     keychain_password: ENV["KEYCHAIN_PASSWORD"],
#     apple_id: ENV["APPLE_ID"],
#     username: ENV["FASTLANE_USER"]
#   )

def ios_testflight_deploy!(options = {})
  require 'fileutils'
  require 'base64'
  require 'fastlane'
  require 'fastlane_core/ui/ui'

  # ──────────────────────────────────────────────────────────────
  # 1️⃣  Required inputs
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

  # ──────────────────────────────────────────────────────────────
  # 2️⃣  Fetch App Store certs & profiles (readonly)
  match(
    type:               "appstore",
    readonly:           true,
    verbose:            true,
    keychain_name:      keychain_name,
    keychain_password:  keychain_password
  )

  # ──────────────────────────────────────────────────────────────
  # 3️⃣  ALSO fetch Development certs & profiles (readonly)
  #     → ensures Xcode can sign intermediate/dev targets during archive
  match(
    type:               "development",
    readonly:           true,
    verbose:            true,
    keychain_name:      keychain_name,
    keychain_password:  keychain_password
  )

  # ──────────────────────────────────────────────────────────────
  # 4️⃣  Bump build number (datetime + PR)
  increment_build_number(
    xcodeproj:    xcodeproj,
    build_number: "#{Time.now.strftime('%m%d.%H%M')}.#{pr_number}"
  )

  # ──────────────────────────────────────────────────────────────
  # 5️⃣  Configure App Store Connect API Key
  app_store_connect_api_key(
    key_id:                 api_key_id,
    issuer_id:              issuer_id,
    key_content:            api_key_b64,
    is_key_content_base64:  true
  )

  # ──────────────────────────────────────────────────────────────
  # 6️⃣  Ensure React Native JS bundle exists
  Dir.chdir("..") do
    ENV["ENVFILE"]  = ".env.preview"
    ENV["NODE_ENV"] = "production"

    js_bundle = File.expand_path("main.jsbundle")
    FastlaneCore::UI.message("🔍 Looking for main.jsbundle at: #{js_bundle}")
    FastlaneCore::UI.user_error!("❌ main.jsbundle not found at: #{js_bundle}") unless File.exist?(js_bundle)
  end

  # ──────────────────────────────────────────────────────────────
  # 7️⃣  Build .ipa with manual signing
  build_app(
    clean:         true,
    scheme:        scheme,
    export_method: "app-store",
    export_options: {
      compileBitcode: false,
      signingStyle:   "manual",
      provisioningProfiles: {
        app_identifier => "match AppStore #{app_identifier}"
      }
    }
  )

  # ──────────────────────────────────────────────────────────────
  # 8️⃣  Strip Hermes bitcode, re-sign, re-zip
  ipa_path = lane_context[:IPA_OUTPUT_PATH]
  sh("unzip -q #{ipa_path} -d temp_payload")
  app_path   = Dir["temp_payload/Payload/*.app"].first
  UI.user_error!("❌ .app bundle not found inside Payload") unless app_path
  hermes_bin = File.join(app_path, "Frameworks/hermes.framework/hermes")

  sh <<~BASH
    echo "🔍 Stripping bitcode from Hermes binary..."
    if [ -f "#{hermes_bin}" ]; then
      xcrun bitcode_strip -r "#{hermes_bin}" -o "#{hermes_bin}"
      echo "🔐 Re-signing frameworks and app..."
      CERT_ID=$(security find-identity -v -p codesigning | grep "Apple Distribution" | head -n1 | awk '{print $2}')
      for FRAMEWORK in "#{app_path}/Frameworks/"*; do
        [ -d "$FRAMEWORK" ] && /usr/bin/codesign --force --sign "$CERT_ID" --timestamp=none "$FRAMEWORK"
      done
      /usr/bin/codesign --force --sign "$CERT_ID" --timestamp=none --preserve-metadata=entitlements "#{app_path}"
    else
      echo "⚠️ Hermes binary not found at #{hermes_bin}; skipping strip."
    fi
    echo "📦 Repacking IPA..."
    cd temp_payload && zip -r -y ../fixed.ipa * >/dev/null && cd ..
    mv fixed.ipa "#{ipa_path}"
    rm -rf temp_payload
  BASH

  # ──────────────────────────────────────────────────────────────
  # 9️⃣  Upload to TestFlight (internal only)
  upload_to_testflight(
    changelog:           "PR ##{pr_number} Build - automated upload",
    distribute_external: false,
    username:            username,
    apple_id:            apple_id,
    app_identifier:      app_identifier
  )
end

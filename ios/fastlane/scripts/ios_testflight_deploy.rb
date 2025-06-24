def ios_testflight_deploy!(options = {})
  require 'fileutils'
  require 'base64'
  require 'fastlane'
  require 'fastlane_core/ui/ui'

  # === Required Inputs ===
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

  # === Setup Signing ===
  match(
    type: "appstore",
    readonly: true,
    verbose: true,
    keychain_name: keychain_name,
    keychain_password: keychain_password
  )

  increment_build_number(
    xcodeproj: xcodeproj,
    build_number: "#{ENV['PR_NUMBER'].to_i % 1000}.#{Time.now.strftime('%m%d')}"
  )

  app_store_connect_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key_content: api_key_b64,
    is_key_content_base64: true,
  )

   Dir.chdir("..") do
    ENV["ENVFILE"] = ".env.preview"
    ENV["NODE_ENV"] = "production"

    js_bundle_path = File.expand_path("main.jsbundle")
    FastlaneCore::UI.message("🔍 Looking for main.jsbundle at: #{js_bundle_path}")

    FastlaneCore::UI.user_error!("❌ main.jsbundle not found at: #{js_bundle_path}") unless File.exist?(js_bundle_path)
   end


  build_app(
    clean: true,
    scheme: scheme,
    export_method: "app-store",
    export_options: {
      compileBitcode: false,
      signingStyle: "manual",
      provisioningProfiles: {
        app_identifier => "match AppStore #{app_identifier}"
      }
    },
  )

  ipa_path = lane_context[:IPA_OUTPUT_PATH]

  sh <<~BASH
      echo "🔍 Stripping bitcode from Hermes binary before uploading to TestFlight..."

      IPA_PATH=#{lane_context[:IPA_OUTPUT_PATH]}
      unzip -q "$IPA_PATH" -d temp_payload

      HERMES_BIN="temp_payload/Payload/Boilerplate.app/Frameworks/hermes.framework/hermes"
      APP_PATH="temp_payload/Payload/Boilerplate.app"

      if [ -f "$HERMES_BIN" ]; then
        echo "📦 Found Hermes binary. Stripping bitcode..."
        xcrun bitcode_strip -r "$HERMES_BIN" -o "$HERMES_BIN"

        echo "🔬 Verifying..."
        if otool -l "$HERMES_BIN" | grep -i bitcode; then
          echo "❌ Bitcode still present! Failing the build."
          exit 1
        else
          echo "✅ Bitcode successfully stripped."
        fi

        echo "🔐 Re-signing .app after modification..."
        CERT_ID=$(security find-identity -v -p codesigning | grep "Apple Distribution" | head -n1 | awk '{print $2}')

        for FRAMEWORK in "$APP_PATH/Frameworks/"*; do
          if [ -d "$FRAMEWORK" ]; then
            /usr/bin/codesign --force --sign "$CERT_ID" --timestamp=none "$FRAMEWORK"
          fi
        done

        /usr/bin/codesign --force --sign "$CERT_ID" \
          --timestamp=none \
          --preserve-metadata=entitlements \
          "$APP_PATH"

        echo "✅ Code signing complete."
      else
        echo "⚠️ Hermes binary not found at expected path: $HERMES_BIN"
        echo "Skipping bitcode stripping."
      fi

      echo "📦 Repacking IPA..."
      cd temp_payload && zip -r -y ../fixed.ipa * >/dev/null && cd ..
      mv fixed.ipa "$IPA_PATH"

      rm -rf temp_payload
    BASH
  original_ipa_path = lane_context[:IPA_OUTPUT_PATH]
  custom_ipa_name = "PR-#{ENV['PR_NUMBER']}.ipa"
  custom_ipa_path = File.expand_path(custom_ipa_name)

  FileUtils.mv(original_ipa_path, custom_ipa_path)
  ENV["CUSTOM_IPA_PATH"] = custom_ipa_path

  upload_to_testflight(
    changelog: "PR ##{pr_number} Build - automated upload",
    distribute_external: false,
    username: username,
    apple_id: apple_id,
    app_identifier: app_identifier
  )
end

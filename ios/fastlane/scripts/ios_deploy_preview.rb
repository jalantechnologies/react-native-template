def ios_deploy_preview!(options = {})
  require 'fileutils'
  require 'base64'
  require 'json'
  require 'fastlane'
  require 'fastlane_core/ui/ui'

  UI = FastlaneCore::UI unless defined?(UI)

  # Required inputs passed from the Fastlane lane or script that invokes this deploy logic.
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

  # Remove old builds for this PR before deploying
  require_relative "ios_cleanup_preview"
  FastlaneCore::UI.message("Checking for old builds for PR ##{pr_number}...")
  ios_cleanup_preview!(
    pr_number: pr_number,
    app_identifier: app_identifier,
    api_key_id: api_key_id,
    issuer_id: issuer_id,
    api_key_b64: api_key_b64
  )

  # Use match in readonly mode to fetch existing App Store signing certificates and provisioning profiles.
  match(
    type: "appstore",
    readonly: true,
    verbose: true,
    keychain_name: keychain_name,
    keychain_password: keychain_password
  )
  UI.message("🧾 Setting iOS marketing version from package.json: #{marketing_version}")
  increment_version_number(
    xcodeproj: xcodeproj,
    version_number: marketing_version
  )
  # Set the build number using current datetime + PR number to ensure uniqueness across PR builds.
  increment_build_number(
    xcodeproj: xcodeproj,
    build_number: "#{Time.now.strftime('%Y%m%d.%H%M')}.#{pr_number}"
  )

  app_store_connect_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key_content: api_key_b64,
    is_key_content_base64: true,
  )
  # Change to the parent directory to run asset bundling and JS pre-checks.
  # This ensures we fail early if the React Native JS bundle doesn't exist.
  Dir.chdir("..") do
    ENV["ENVFILE"] = ".env.preview"
    ENV["NODE_ENV"] = "production"

    js_bundle_path = File.expand_path("main.jsbundle")
    FastlaneCore::UI.message("🔍 Looking for main.jsbundle at: #{js_bundle_path}")

    FastlaneCore::UI.user_error!("❌ main.jsbundle not found at: #{js_bundle_path}") unless File.exist?(js_bundle_path)
  end
  # Build the .ipa with manual signing configuration, specifying the correct provisioning profile via `match`.
  build_app(
    clean: true,
    scheme: scheme,
    export_method: "app-store",
    verbose: true,
    xcargs: "CODE_SIGN_STYLE=Manual CODE_SIGN_IDENTITY=\"Apple Distribution\" DEVELOPMENT_TEAM=#{team_id} PROVISIONING_PROFILE_SPECIFIER=\"match AppStore #{app_identifier}\" PRODUCT_BUNDLE_IDENTIFIER=#{app_identifier}",
    export_options: {
      compileBitcode: false,# Bitcode is stripped manually below due to Hermes compatibility issues.
      signingStyle: "manual",
      provisioningProfiles: {
        app_identifier => "match AppStore #{app_identifier}"
      }
    },
  )

  ipa_path = lane_context[:IPA_OUTPUT_PATH]
  sh("unzip -q #{ipa_path} -d temp_payload")
  app_path = Dir["temp_payload/Payload/*.app"].first
  UI.user_error!("❌ .app bundle not found inside Payload") unless app_path
  hermes_bin = File.join(app_path, "Frameworks/hermes.framework/hermes")
  # Strip bitcode manually from Hermes binary to avoid App Store submission errors.
  # Hermes framework often includes bitcode sections that aren't removed by default tools.
  sh <<~BASH
      echo "🔍 Stripping bitcode from Hermes binary before uploading to TestFlight..."

      if [ -f "#{hermes_bin}" ]; then
        echo "📦 Found Hermes binary. Stripping bitcode..."
        xcrun bitcode_strip -r "#{hermes_bin}" -o "#{hermes_bin}"

        echo "🔬 Verifying..."
        if otool -l "#{hermes_bin}" | grep -i bitcode; then
          echo "❌ Bitcode still present! Failing the build."
          exit 1
        else
          echo "✅ Bitcode successfully stripped."
        fi

        echo "🔐 Re-signing .app after modification..."
        CERT_ID=$(security find-identity -v -p codesigning | grep "Apple Distribution" | head -n1 | awk '{print $2}')

        for FRAMEWORK in "#{app_path}/Frameworks/"*; do
          if [ -d "$FRAMEWORK" ]; then
            /usr/bin/codesign --force --sign "$CERT_ID" --timestamp=none "$FRAMEWORK"
          fi
        done

        /usr/bin/codesign --force --sign "$CERT_ID" \
          --timestamp=none \
          --preserve-metadata=entitlements \
          "#{app_path}"

        echo "✅ Code signing complete."
      else
        echo "⚠️ Hermes binary not found at expected path: #{hermes_bin}"
        echo "Skipping bitcode stripping."
      fi

      echo "📦 Repacking IPA..."
      cd temp_payload && zip -r -y ../fixed.ipa * >/dev/null && cd ..
      mv fixed.ipa "#{ipa_path}"

      rm -rf temp_payload
    BASH
  # Upload the build to TestFlight (internal only) with a changelog indicating the PR number.
  begin  
    upload_to_testflight(
      changelog: "PR ##{pr_number} Build - automated upload",
      distribute_external: false,
      username: username,
      apple_id: apple_id,
      app_identifier: app_identifier
    )
  rescue => e
    # In case of failure, cleanup any temp IPA directories
    sh("rm -rf #{ipa_path}")  # Clean up the IPA file or temp directory if it exists

    # Alert the user that upload failed
    UI.error("Upload to TestFlight failed: #{e.message}")

    # trigger ios_testflight_cleanup to remove stale builds
    require_relative "ios_cleanup_preview"
    ios_cleanup_preview!(
      pr_number: ENV["PR_NUMBER"],
      app_identifier: ENV["IOS_APP_IDENTIFIER"],
      api_key_id: ENV['IOS_APP_STORE_CONNECT_API_KEY_ID'],
      issuer_id: ENV['IOS_APP_STORE_CONNECT_API_KEY_ISSUER_ID'],
      api_key_b64: ENV['IOS_APP_STORE_CONNECT_API_KEY_B64']
    )
    # Re-raise the error to ensure the failure is properly logged in Fastlane
    raise e
  end
end

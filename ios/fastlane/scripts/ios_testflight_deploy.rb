def ios_testflight_deploy!(options = {})
  require 'fileutils'
  require 'base64'
  require 'fastlane'
  require 'fastlane_core/ui/ui'

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

  # Use match in readonly mode to fetch existing App Store signing certificates and provisioning profiles.
  match(
    type: "appstore",
    readonly: true,
    verbose: true,
    keychain_name: keychain_name,
    keychain_password: keychain_password
  )
  
  # Set the build number using current datetime + PR number to ensure uniqueness across PR builds.
  increment_build_number(
    xcodeproj: xcodeproj,
    build_number: "#{Time.now.strftime('%m%d.%H%M')}.#{pr_number}"  # Fixed: use pr_number instead of ENV
  )

  app_store_connect_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key_content: api_key_b64,
    is_key_content_base64: true,
  )
  
  # FIXED: Check for bundle in current ios directory, not parent
  js_bundle_path = File.expand_path("main.jsbundle")
  FastlaneCore::UI.message("🔍 Looking for main.jsbundle at: #{js_bundle_path}")
  
  unless File.exist?(js_bundle_path)
    FastlaneCore::UI.user_error!("❌ main.jsbundle not found at: #{js_bundle_path}")
  end
  
  FastlaneCore::UI.success("✅ Found main.jsbundle at: #{js_bundle_path}")

  # Build the .ipa with manual signing configuration, specifying the correct provisioning profile via `match`.
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

  # SIMPLIFIED: Remove complex bitcode stripping since we disabled bitcode
  FastlaneCore::UI.message("📦 IPA built successfully, bitcode disabled in export options")

  # Upload the build to TestFlight (internal only) with a changelog indicating the PR number.
  upload_to_testflight(
    changelog: "PR ##{pr_number} Build - automated upload via CI/CD",
    distribute_external: false,
    username: username,
    apple_id: apple_id,
    app_identifier: app_identifier,
    skip_waiting_for_build_processing: true,
    skip_submission: true
  )
  
  FastlaneCore::UI.success("🚀 Successfully uploaded build to TestFlight!")
end


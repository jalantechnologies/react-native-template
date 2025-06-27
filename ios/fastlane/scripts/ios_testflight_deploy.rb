def ios_testflight_deploy!(options = {})
  require 'fileutils'
  require 'base64'
  require 'fastlane'
  require 'fastlane_core/ui/ui'

  # Required inputs…
  pr_number        = options.fetch(:pr_number)
  app_identifier   = options.fetch(:app_identifier)
  xcodeproj        = options.fetch(:xcodeproj)
  scheme           = options.fetch(:scheme)
  api_key_id       = options.fetch(:api_key_id)
  issuer_id        = options.fetch(:issuer_id)
  api_key_b64      = options.fetch(:api_key_b64)
  keychain_name    = options.fetch(:keychain_name)
  keychain_password= options.fetch(:keychain_password)
  apple_id         = options.fetch(:apple_id)
  username         = options.fetch(:username)

  # 1️⃣ Fetch App Store certs & profiles
  match(
    type: "appstore",
    readonly: true,
    verbose: true,
    keychain_name: keychain_name,
    keychain_password: keychain_password
  )

  # 2️⃣ ALSO fetch Development certs & profiles (so Xcode has a dev profile for the archive step)
  match(
    type: "development",
    readonly: true,
    verbose: true,
    keychain_name: keychain_name,
    keychain_password: keychain_password
  )

  # 3️⃣ Bump build number
  increment_build_number(
    xcodeproj: xcodeproj,
    build_number: "#{Time.now.strftime('%m%d.%H%M')}.#{pr_number}"
  )

  app_store_connect_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key_content: api_key_b64,
    is_key_content_base64: true,
  )

  # 4️⃣ Ensure JS bundle exists
  Dir.chdir("..") do
    ENV["ENVFILE"]   = ".env.preview"
    ENV["NODE_ENV"]  = "production"
    js_bundle_path   = File.expand_path("main.jsbundle")
    FastlaneCore::UI.message("🔍 Looking for main.jsbundle at: #{js_bundle_path}")
    FastlaneCore::UI.user_error!("❌ main.jsbundle not found at: #{js_bundle_path}") unless File.exist?(js_bundle_path)
  end

  # 5️⃣ Build with manual signing (profiles are already installed)
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

  # …the rest of your Hermes‐stripping + TestFlight upload logic remains unchanged…
  ipa_path = lane_context[:IPA_OUTPUT_PATH]
  sh("unzip -q #{ipa_path} -d temp_payload")
  app_path = Dir["temp_payload/Payload/*.app"].first
  UI.user_error!("❌ .app bundle not found inside Payload") unless app_path
  hermes_bin = File.join(app_path, "Frameworks/hermes.framework/hermes")
  # (strip bitcode, re-sign, re-zip, etc.)

  upload_to_testflight(
    changelog: "PR ##{pr_number} Build - automated upload",
    distribute_external: false,
    username: username,
    apple_id: apple_id,
    app_identifier: app_identifier
  )
end


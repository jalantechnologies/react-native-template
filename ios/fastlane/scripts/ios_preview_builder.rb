require 'fastlane_core/ui/ui'
UI = FastlaneCore::UI unless defined?(UI)

def ios_build_preview!(options = {})
  require 'fileutils'
  require 'json'
  require 'fastlane'

  app_identifier    = options.fetch(:app_identifier)
  xcodeproj         = options.fetch(:xcodeproj)
  scheme            = options.fetch(:scheme)
  workspace         = options.fetch(:workspace)
  team_id           = options.fetch(:team_id)
  keychain_name     = options.fetch(:keychain_name)
options.fetch(:keychain_password)
  output_directory  = options.fetch(:output_directory)
  output_name       = options.fetch(:output_name)
  build_number      = options.fetch(:build_number)
  profile_name      = options.fetch(:profile_name)
  configuration     = options.fetch(:configuration, 'Release')
  export_method     = options.fetch(:export_method, 'app-store')

  package_json_path = File.expand_path('../../../package.json', __dir__)
  package_json = JSON.parse(File.read(package_json_path))
  marketing_version = package_json['version']
  UI.user_error!("❌ Version not found in package.json") unless marketing_version

  UI.message("📱 Preview marketing version: #{marketing_version}")
  increment_version_number(
    xcodeproj: xcodeproj,
    version_number: marketing_version
  )

  UI.message("🔢 Using preview build number: #{build_number}")
  increment_build_number(
    xcodeproj: xcodeproj,
    build_number: build_number
  )

  envfile_path = File.expand_path('../../../.env', __dir__)
  ENV['ENVFILE'] = envfile_path
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
  UI.user_error!('❌ main.jsbundle not found') unless File.exist?(js_bundle_path)

  FileUtils.mkdir_p(output_directory)

  UI.message('🏗️ Building IPA...')
  build_app(
    clean: true,
    scheme: scheme,
    workspace: workspace,
    configuration: configuration,
    export_method: export_method,
    output_directory: output_directory,
    output_name: output_name,
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

  ipa_path = lane_context[:IPA_OUTPUT_PATH]
  UI.user_error!('❌ IPA path missing in lane_context') unless ipa_path && File.exist?(ipa_path)

  UI.message("📦 Processing IPA: #{ipa_path}")
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

  UI.success("✅ Preview IPA ready at #{ipa_path}")
end

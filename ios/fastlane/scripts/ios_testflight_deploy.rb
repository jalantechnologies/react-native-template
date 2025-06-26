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

  # Add debug information
  FastlaneCore::UI.message("🔍 Build Environment:")
  FastlaneCore::UI.message("  - Xcode path: #{sh('xcode-select -p').strip}")
  FastlaneCore::UI.message("  - Xcode version: #{sh('xcodebuild -version | head -1').strip}")
  FastlaneCore::UI.message("  - CocoaPods version: #{sh('pod --version').strip}")
  FastlaneCore::UI.message("  - Ruby version: #{RUBY_VERSION}")
  FastlaneCore::UI.message("  - Working directory: #{Dir.pwd}")

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
    build_number: "#{Time.now.strftime('%m%d.%H%M')}.#{pr_number}"
  )

  app_store_connect_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key_content: api_key_b64,
    is_key_content_base64: true,
  )
  
  # Fix: Change to the parent directory to run asset bundling and JS pre-checks.
  # This ensures we fail early if the React Native JS bundle doesn't exist.
  Dir.chdir("..") do
    ENV["ENVFILE"] = ".env.preview"
    ENV["NODE_ENV"] = "production"

    # Check multiple possible locations for the JS bundle
    js_bundle_paths = [
      File.expand_path("ios/main.jsbundle"),    # Most likely location after workflow change
      File.expand_path("main.jsbundle"),        # Original expected location
      File.expand_path("./main.jsbundle"),      # Current directory
      File.expand_path("../main.jsbundle")      # Parent directory
    ]
    
    js_bundle_path = js_bundle_paths.find { |path| File.exist?(path) }
    
    FastlaneCore::UI.message("🔍 Looking for main.jsbundle in multiple locations:")
    js_bundle_paths.each { |path| FastlaneCore::UI.message("  - #{path} (#{File.exist?(path) ? '✅' : '❌'})") }
    
    if js_bundle_path
      FastlaneCore::UI.success("✅ Found main.jsbundle at: #{js_bundle_path}")
      
      # Get file size for debugging
      file_size = File.size(js_bundle_path)
      FastlaneCore::UI.message("📊 Bundle size: #{file_size} bytes (#{(file_size / 1024.0 / 1024.0).round(2)} MB)")
      
      # Basic validation - bundle should be reasonable size
      if file_size < 1000  # Less than 1KB is likely an error
        FastlaneCore::UI.user_error!("❌ main.jsbundle seems too small (#{file_size} bytes). Check bundle generation.")
      end
    else
      FastlaneCore::UI.user_error!("❌ main.jsbundle not found in any expected location. Please check bundle generation step.")
    end
  end
  
  # Build the .ipa with manual signing configuration, specifying the correct provisioning profile via `match`.
  begin
    FastlaneCore::UI.message("🔨 Starting iOS build...")
    
    build_app(
      clean: true,
      scheme: scheme,
      export_method: "app-store",
      build_settings: {
        # Fix: Force Swift optimization level for consistency
        "SWIFT_OPTIMIZATION_LEVEL" => "-Onone",
        # Disable bitcode
        "ENABLE_BITCODE" => "NO",
        # Force manual signing
        "CODE_SIGN_STYLE" => "Manual"
      },
      export_options: {
        compileBitcode: false,  # Bitcode is stripped manually below due to Hermes compatibility issues.
        signingStyle: "manual",
        provisioningProfiles: {
          app_identifier => "match AppStore #{app_identifier}"
        }
      },
      # Add build logs directory
      buildlog_path: "./build_logs",
      # Increase verbosity
      output_directory: "./build"
    )
    
    FastlaneCore::UI.success("✅ iOS build completed successfully!")
    
  rescue => e
    FastlaneCore::UI.error("❌ Build failed with error: #{e.message}")
    
    # Print build logs if available
    build_log_files = Dir.glob("./build_logs/**/*.log")
    if build_log_files.any?
      FastlaneCore::UI.message("📋 Available build logs:")
      build_log_files.each { |log_file| FastlaneCore::UI.message("  - #{log_file}") }
      
      # Print the most recent log file (usually contains the error)
      latest_log = build_log_files.max_by { |f| File.mtime(f) }
      if latest_log && File.exist?(latest_log)
        FastlaneCore::UI.message("📋 Latest build log content (last 50 lines):")
        log_content = File.read(latest_log)
        log_lines = log_content.split("\n")
        last_lines = log_lines.last(50)
        last_lines.each { |line| FastlaneCore::UI.message(line) }
      end
    end
    
    raise e
  end

  ipa_path = lane_context[:IPA_OUTPUT_PATH]
  
  # Verify IPA was created
  unless ipa_path && File.exist?(ipa_path)
    FastlaneCore::UI.user_error!("❌ IPA file not found at expected path: #{ipa_path}")
  end
  
  FastlaneCore::UI.message("📦 IPA created at: #{ipa_path}")
  FastlaneCore::UI.message("📊 IPA size: #{(File.size(ipa_path) / 1024.0 / 1024.0).round(2)} MB")
  
  # Extract and process the IPA for Hermes bitcode stripping
  FastlaneCore::UI.message("🔧 Processing IPA for Hermes compatibility...")
  
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

        if [ -z "$CERT_ID" ]; then
          echo "❌ No Apple Distribution certificate found!"
          exit 1
        fi

        echo "🔑 Using certificate: $CERT_ID"

        for FRAMEWORK in "#{app_path}/Frameworks/"*; do
          if [ -d "$FRAMEWORK" ]; then
            echo "🔐 Signing framework: $(basename "$FRAMEWORK")"
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

  FastlaneCore::UI.message("🚀 Uploading to TestFlight...")
  
  # Upload the build to TestFlight (internal only) with a changelog indicating the PR number.
  begin
    upload_to_testflight(
      changelog: "PR ##{pr_number} Build - automated upload from CI\n\nGenerated: #{Time.now.strftime('%Y-%m-%d %H:%M:%S UTC')}",
      distribute_external: false,
      username: username,
      apple_id: apple_id,
      app_identifier: app_identifier,
      skip_waiting_for_build_processing: true  # Don't wait for Apple's processing
    )
    
    FastlaneCore::UI.success("🎉 TestFlight upload completed successfully!")
    
  rescue => e
    FastlaneCore::UI.error("❌ TestFlight upload failed: #{e.message}")
    raise e
  end
end
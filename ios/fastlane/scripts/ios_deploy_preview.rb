require 'fastlane_core/ui/ui'
UI = FastlaneCore::UI unless defined?(UI)

def ios_deploy_preview!(options = {})
  require 'fileutils'
  require 'base64'
  require 'json'
  require 'fastlane'
  require_relative 'release_notes_helper'
  require_relative 'ios_preview_builder'

  # ---------------------------------------------------------------------------
  # Required inputs
  # ---------------------------------------------------------------------------
  pr_number         = options.fetch(:pr_number)
  app_identifier    = options.fetch(:app_identifier)
  xcodeproj         = options.fetch(:xcodeproj)
  scheme            = options.fetch(:scheme)
  workspace         = options.fetch(:workspace)
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

  ios_build_preview!(
    app_identifier: app_identifier,
    xcodeproj: xcodeproj,
    scheme: scheme,
    workspace: workspace,
    scheme: scheme,
    workspace: workspace,
    team_id: team_id,
    keychain_name: keychain_name,
    keychain_password: keychain_password,
    output_directory: "build/preview",
    output_name: "Boilerplate.ipa",
    build_number: next_build,
    profile_name: profile_name
  )

  ipa_path = lane_context[:IPA_OUTPUT_PATH]
  UI.user_error!('❌ IPA path missing in lane_context') unless ipa_path && File.exist?(ipa_path)

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
      distribute_external: true,                 # send to external testers, project specific
      groups: ["External Testers"],    # <-- project-specific, see comment
      notify_external_testers: true,             # send email/notification, project specific
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
    if defined?(keychain_name) && keychain_name
      UI.message('🧹 Cleaning up preview keychain...')
      begin
        delete_keychain(name: keychain_name)
      rescue => e
        UI.message("⚠️ Keychain cleanup failed: #{e.message}")
      end
    end
  end
end
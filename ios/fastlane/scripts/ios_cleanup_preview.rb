require 'spaceship'
require 'base64'
require 'fastlane'
require 'fastlane_core/ui/ui'

# =============================================================================
# iOS Preview Build Cleanup
# =============================================================================
#
# PURPOSE:
# Cleans up old TestFlight preview builds for a specific Pull Request before
# deploying a new build. This prevents build accumulation and keeps TestFlight
# organized.
#
# BUILD NUMBER FORMAT:
# Preview builds use format: <PR_NUMBER><YYMMDDHHMM>
# Example: PR 42 on 2025-12-17 10:58 UTC → 422512171058
# - First digits: PR number (e.g., "42")
# - Last 10 digits: Timestamp in YYMMDDHHMM format
#
# MATCHING LOGIC:
# This script identifies PR builds by checking if the build number STARTS with
# the PR number. For example:
# - PR #42 → Matches builds: 422512171058, 422512180930, etc.
# - PR #123 → Matches builds: 1232512171058, 1232512180930, etc.
#
# CLEANUP ACTIONS:
# 1. Expires the build (removes from TestFlight distribution)
# 2. Attempts deletion if supported by the API
#
# LIMITATIONS:
# - App Store Connect API doesn't support direct filtering by build number
# - Must fetch builds and filter client-side (limited to 50 most recent)
# - Some builds cannot be deleted, only expired
#
# USAGE:
# Called automatically from ios_deploy_preview! before each new build upload
#
# =============================================================================

def ios_cleanup_preview!(pr_number:, app_identifier:, api_key_id:, issuer_id:, api_key_b64:)
  UI = FastlaneCore::UI
  
  # ---------------------------------------------------------------------------
  # Normalize PR number to match build number format
  # ---------------------------------------------------------------------------
  # Remove any non-numeric characters from PR number (e.g., "#42" → "42")
  pr_digits = pr_number.to_s.gsub(/[^0-9]/, '')
  
  if pr_digits.empty?
    UI.error("❌ Invalid PR number '#{pr_number}' - contains no digits")
    return
  end
  
  UI.message("🔍 Looking for builds matching PR ##{pr_number} (starts with: #{pr_digits})")
  
  # ---------------------------------------------------------------------------
  # Authenticate with App Store Connect API
  # ---------------------------------------------------------------------------
  begin
    # Decode base64-encoded API key
    decoded_key = Base64.decode64(api_key_b64)
    
    # Create authentication token
    token = Spaceship::ConnectAPI::Token.create(
      key_id: api_key_id,
      issuer_id: issuer_id,
      key: decoded_key
    )
    
    Spaceship::ConnectAPI.token = token
    UI.success("✅ Authenticated with App Store Connect")
  rescue => e
    UI.error("❌ Authentication failed: #{e.message}")
    return
  end
  
  # ---------------------------------------------------------------------------
  # Find the app in App Store Connect
  # ---------------------------------------------------------------------------
  app = Spaceship::ConnectAPI::App.find(app_identifier)
  UI.user_error!("❌ App '#{app_identifier}' not found in App Store Connect") unless app
  
  UI.success("✅ Found app: #{app.name} (#{app_identifier})")
  
  # ---------------------------------------------------------------------------
  # Fetch and filter builds
  # ---------------------------------------------------------------------------
  # NOTE: App Store Connect API doesn't support server-side filtering by build number,
  # so we must fetch builds and filter client-side. Limiting to 50 most recent builds
  # for performance - older builds are unlikely to conflict anyway.
  
  begin
    UI.message("📦 Fetching recent builds (limit: 50)...")
    builds = app.get_builds(limit: 50)
    
    if builds.nil? || builds.empty?
      UI.message("ℹ️ No builds found for this app")
      return
    end
    
    UI.message("📊 Found #{builds.count} total builds")
  rescue => e
    UI.error("❌ Failed to fetch builds: #{e.message}")
    return
  end
  
  # ---------------------------------------------------------------------------
  # Filter builds matching this PR's build number pattern
  # ---------------------------------------------------------------------------
  # Build numbers for this PR start with pr_digits followed by timestamp
  # Example: PR 42 → build numbers like 422512171058, 422512180930, etc.
  
  matching_builds = builds.select do |build|
    build_number = build.version.to_s
    
    # Check if build number starts with PR digits
    # This matches the format: <PR_NUMBER><YYMMDDHHMM>
    starts_with_pr = build_number.start_with?(pr_digits)
    
    # Additional validation: ensure the build number has the expected length
    # PR digits + 10 timestamp digits = total length
    # Allow up to 18 chars (App Store limit) in case of truncation
    expected_min_length = pr_digits.length + 10
    valid_length = build_number.length >= expected_min_length && build_number.length <= 18
    
    starts_with_pr && valid_length
  end
  
  if matching_builds.empty?
    UI.message("✨ No existing builds found for PR ##{pr_number}")
    return
  end
  
  UI.message("🎯 Found #{matching_builds.count} build(s) to clean up for PR ##{pr_number}")
  
  # ---------------------------------------------------------------------------
  # Clean up each matching build
  # ---------------------------------------------------------------------------
  matching_builds.each do |build|
    build_version = build.version
    build_id = build.id
    
    UI.message("🧹 Processing build: #{build_version} (ID: #{build_id})")
    
    begin
      # Fetch fresh build data to ensure we have latest state
      fresh_build = Spaceship::ConnectAPI::Build.get(build_id: build_id)
      
      unless fresh_build
        UI.error("⚠️ Build #{build_id} not found (may have been deleted already)")
        next
      end
      
      # ---------------------------------------------------------------------------
      # Step 1: Expire the build
      # ---------------------------------------------------------------------------
      # Expiring removes the build from TestFlight distribution
      # This is the primary cleanup action and is always supported
      
      begin
        fresh_build.expire!
        UI.success("✅ Expired build #{build_version} (#{build_id})")
      rescue => e
        # Some builds may already be expired or in a state that prevents expiration
        if e.message.include?("already expired") || e.message.include?("invalid state")
          UI.message("ℹ️ Build #{build_id} already expired or cannot be expired")
        else
          UI.error("❌ Failed to expire build #{build_id}: #{e.message}")
        end
      end
      
      # ---------------------------------------------------------------------------
      # Step 2: Attempt to delete the build (if supported)
      # ---------------------------------------------------------------------------
      # Not all builds can be deleted via API - depends on build state and timing
      # This is a best-effort operation
      
      if fresh_build.respond_to?(:delete!)
        begin
          fresh_build.delete!
          UI.success("🗑️ Deleted build #{build_version} (#{build_id})")
        rescue => e
          # Deletion may fail for various reasons (build in review, timing, etc.)
          UI.message("ℹ️ Could not delete build #{build_id}: #{e.message}")
          UI.message("   Build has been expired and will not appear in TestFlight")
        end
      else
        UI.message("ℹ️ Build #{build_id} can only be expired (deletion not supported)")
      end
      
    rescue => e
      UI.error("❌ Error processing build #{build_id}: #{e.message}")
      next
    end
  end
  
  UI.success("✅ Cleanup complete for PR ##{pr_number}")
  
rescue => e
  UI.error("❌ Cleanup failed: #{e.message}")
  UI.error(e.backtrace.join("\n")) if FastlaneCore::Globals.verbose?
  # Don't raise - cleanup failure shouldn't block new build upload
end
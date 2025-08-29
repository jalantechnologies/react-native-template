def ios_deploy_production!(options = {})
  require 'fileutils'
  require 'base64'
  require 'fastlane'
  require 'fastlane_core/ui/ui'

  app_identifier = options.fetch(:app_identifier)
  workspace = options.fetch(:workspace)
  scheme = options.fetch(:scheme)
  api_key_id = options.fetch(:api_key_id)
  issuer_id = options.fetch(:issuer_id)
  api_key_b64 = options.fetch(:api_key_b64)
  keychain_name = options.fetch(:keychain_name)
  keychain_password = options.fetch(:keychain_password)
  team_id = options.fetch(:team_id)

  # For production: we do NOT increment build_number here
  # because it's already set in sync_versions lane.
  # Just ensure Xcode project versioning is respected.

  app_store_connect_api_key(
    key_id: api_key_id,
    issuer_id: issuer_id,
    key_content: api_key_b64,
    is_key_content_base64: true,
  )

  # Build IPA for production
  build_app(
  workspace: workspace,
  scheme: scheme,
  clean: true,
  configuration: "Release",
  export_method: "app-store",
  export_options: {
    compileBitcode: false,
    provisioningProfiles: {
      app_identifier => "match AppStore #{app_identifier}"
    }
  }
)

  # Upload IPA to App Store (for distribution)
  upload_to_app_store(
    changelog: "App uploaded via CI/CD",
    skip_screenshots: true,
    skip_metadata: true,
    skip_app_version_update: true,
    force: true,
    precheck_include_in_app_purchases: false,
  )
end

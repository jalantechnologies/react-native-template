require 'fastlane_core/ui/ui'
UI = FastlaneCore::UI unless defined?(UI)

def normalize_release_notes(raw_notes)
  notes = raw_notes.to_s.strip
  notes.empty? ? nil : notes
end

def build_app_store_release_notes(raw_notes)
  notes = normalize_release_notes(raw_notes)
  return notes if notes

  UI.message('⚠️ No release notes provided. Using default App Store release notes.')
  'Bug fixes and performance improvements.'
end

def build_testflight_changelog(raw_notes, pr_number:, build_number:)
  notes = normalize_release_notes(raw_notes)
  return "PR ##{pr_number} (Build #{build_number}) - Automated preview" unless notes

  return notes if notes.match?(/what to test/i)

  <<~CHANGELOG.strip
    What's New
    #{notes}

    What to Test
    - Exercise core user flows (login, navigation, critical transactions)
    - Validate the changes listed above
    - Watch for regressions or crashes
  CHANGELOG
end
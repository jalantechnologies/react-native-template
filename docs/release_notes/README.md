# Release notes workflow

Release notes for both Android and iOS are sourced from this folder and must match the version in `package.json`.

## How to add release notes
1. Update the app version in `package.json`.
2. Create a Markdown file named after the version inside `docs/release_notes` (for example, `1.0.11.md`).
3. Use the following format:
   ```md
   # <version>

   - Short bullet(s) explaining the user-facing changes in this release.
   - Prefer concise, complete sentences.
   ```

## Why this matters
- CI uses `release_notes_check` to fail the build if the notes file for the current version is missing.
- The Android pipeline copies these notes into the Google Play changelog.
- The iOS pipelines reuse the same notes for TestFlight previews and App Store submissions.

## Tips
- Keep the most important user-facing updates at the top of the list.
- Avoid internal-only details unless they affect users or testers.
- If there are no notable changes, explicitly state that (e.g., `- Maintenance and dependency updates only`).

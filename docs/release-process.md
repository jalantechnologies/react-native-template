# Release Process

Use these steps for production releases and permanent preview artifacts.

1. Update [`docs/release_notes/release_notes.md`](./release_notes/release_notes.md) with release notes (max 500 characters, not placeholder text).
2. Ensure PR title follows conventional format so `pr-labeler` can apply the semver label (`semver: patch|minor|major`).
3. Open a PR targeting `main`; ensure `ci` and preview `cd` checks pass and the PR is approved.
4. Merge PR to `main`.
5. `version-bump.yml` runs automatically and:
   - bumps [`package.json`](../package.json),
   - rotates `docs/release_notes/release_notes.md` to `docs/release_notes/<new_version>.md`,
   - seeds a fresh `docs/release_notes/release_notes.md`,
   - pushes commit `chore: bump version to v<new_version>`.
6. The bump commit push automatically triggers `production.yml` and `permanent_preview.yml`.
7. Verify deployments:
   - Check the `production.yml` workflow run for success.
   - Confirm store uploads: Play Console Internal track and App Store Connect build appear for the new version.
8. Rollback:
   - Revert the offending commit, bump version if needed, update release notes, and merge; pipelines will redeploy.

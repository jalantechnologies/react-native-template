# Release Process

Use these steps for production releases and permanent preview artifacts.

1. Update the version in [`package.json`](../package.json), it should be greater than `main` branch.
2. Create [`docs/release_notes/{version}.md`](./release_notes/) (max 500 characters). CI blocks if the file is missing or empty.
3. Open a PR targeting `main`; ensure `ci` and `cd` checks pass and the PR is approved.
4. After merge to `main`, production and permanent preview pipelines run automatically.
5. Verify deployments:
   - Check the `production.yml` workflow run for success.
   - Confirm store uploads: Play Console Internal track and App Store Connect build appear for the new version.
6. Rollback:
   - Revert the offending commit, bump version if needed, update release notes, and merge; pipelines will redeploy.
# Release Process

Use these steps for production releases and permanent preview artifacts.

1. Choose a version (SemVer): bump **patch** for fixes/docs, **minor** for new features, **major** for breaking changes.
2. Update the version in [`package.json`](../package.json).
3. Create [`docs/release_notes/{version}.md`](./release_notes/) (max 500 characters). CI blocks if the file is missing or empty.
4. Open a PR targeting `main`; ensure `ci` and `cd` checks pass and the PR is approved.
5. After merge to `main`, production and permanent preview pipelines run automatically.
6. Verify deployments:
   - Check the `production.yml` workflow run for success.
   - Confirm store uploads: Play Console Internal track and App Store Connect build appear for the new version.
7. Rollback:
   - Revert the offending commit, bump version if needed, update release notes, and merge; pipelines will redeploy.
   - For preview artifacts, re-run the last good workflow or delete the bad PR build.

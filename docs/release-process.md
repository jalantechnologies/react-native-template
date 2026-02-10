# Release Process

Use these steps for production releases and permanent preview artifacts.

1. Update the version in `package.json`.
2. Create `docs/release_notes/{version}.md` (max 500 characters) for the updated version.
3. Open a PR targeting `main`, make sure all checks are passed and PR is approved.
4. After merge to `main`, production deployment and permanent preview release pipelines trigger automatically.


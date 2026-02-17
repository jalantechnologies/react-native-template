# Automation & Tooling

This project uses GitHub Actions, Doppler, and Fastlane to run PR previews and post-merge releases.

## GitHub Workflows

Read deeper workflow behavior in [CI](./ci.md) and [CD](./cd.md).

- [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) — Pull request checks (lint, type-check, SonarQube).
- [`.github/workflows/cd.yml`](../.github/workflows/cd.yml) — PR preview deployments (Android Firebase + iOS TestFlight) with release-notes validation.
- [`.github/workflows/version-bump.yml`](../.github/workflows/version-bump.yml) — Runs after PR merge to `main`, bumps version, rotates release notes, and pushes bump commit.
- [`.github/workflows/production.yml`](../.github/workflows/production.yml) — Production deploys from the version-bump commit pushed to `main`.
- [`.github/workflows/permanent_preview.yml`](../.github/workflows/permanent_preview.yml) — Permanent preview release from the same version-bump commit.
- [`.github/workflows/clean.yml`](../.github/workflows/clean.yml) — Cleans preview artifacts when PRs close.

## Automatic Version Bumping (Detailed)

### Trigger and concurrency

- Trigger: `pull_request_target` on `closed` for `main`.
- Job condition: only runs when PR is merged (`github.event.pull_request.merged == true`).
- Concurrency group: `version-bump-main` to serialize bumps on `main`.

### Authentication and push identity

- This repo uses the GitHub App identity `Better Software-version-bump-bot` for automated bump commits.
- The app is installed at organization level, and its credentials are managed as organization secrets.
- We use this bot because `main` is protected for security: direct pushes are restricted and normal development changes must go through pull requests.
- The bot is the controlled exception for only the post-merge automation commit (`chore: bump version to v...`).
- The workflow creates a GitHub App installation token with:
  - `VERSION_BUMP_APP_ID`
  - `VERSION_BUMP_PRIVATE_KEY`
- Pushes use that App token, which allows controlled bypass of branch rulesets configured for the app/bot identity.
- If this project is forked, the same automation will not work out-of-the-box unless the fork configures either:
  - an equivalent GitHub App with bypass permission and matching secrets, or
  - a PAT with required repo/workflow access and branch-ruleset bypass capability.

### Required bot permissions (GitHub App)

For `Better Software-version-bump-bot` (or an equivalent fork bot), configure:

- Read access to metadata
- Read access to pull requests
- Read and write access to actions
- Read and write access to code (repository contents)

### Fork setup checklist

If an outsider forks this repository and wants the same release automation:

1. Create/install a GitHub App (or use a PAT fallback) that can bypass branch protections/rulesets for the target branch.
2. Grant the app the permissions listed above.
3. Add secrets in the fork repository:
   - `VERSION_BUMP_APP_ID`
   - `VERSION_BUMP_PRIVATE_KEY`
4. Ensure `main` branch protections allow the app as a bypass actor for version bump commits.
5. Keep workflow files unchanged so merge -> version bump -> production/permanent-preview remains deterministic.

### Bump resolution and skip behavior

- The workflow reads labels on the merged PR and maps:
  - `semver: major` -> `major`
  - `semver: minor` -> `minor`
  - `semver: patch` -> `patch`
- If no semver label exists, the job exits with a "Version Bump Skipped" summary and does not push any commit.

## Downstream Release Triggering

- `production.yml` and `permanent_preview.yml` are both `push` workflows on `main`.
- Both are further guarded to run only when commit message starts with:
  - `chore: bump version to v`
- Both also filter paths:
  - `package.json`
  - `docs/release_notes/**`

This guarantees production/permanent-preview runs happen only from the version-bump commit path.

## Reusable Local Actions

- [`.github/actions/inject_doppler_secrets`](../.github/actions/inject_doppler_secrets) — Fetches environment secrets from Doppler and writes `.env`.
- [`.github/actions/release_notes_check`](../.github/actions/release_notes_check) — Validates release notes (exists, non-empty, <= 500 chars, placeholder removed) and outputs note text.
- Preview deploy actions:
  - [`.github/actions/deploy_android_preview`](../.github/actions/deploy_android_preview)
  - [`.github/actions/deploy_ios_preview`](../.github/actions/deploy_ios_preview)
  - [`.github/actions/update_preview_comment`](../.github/actions/update_preview_comment)
- Production/permanent preview actions:
  - [`.github/actions/deploy_android_production`](../.github/actions/deploy_android_production)
  - [`.github/actions/deploy_ios_production`](../.github/actions/deploy_ios_production)
  - [`.github/actions/permanent_preview_android`](../.github/actions/permanent_preview_android)
  - [`.github/actions/permanent_preview_ios`](../.github/actions/permanent_preview_ios)
  - [`.github/actions/permanent_preview_release`](../.github/actions/permanent_preview_release)

## Doppler Secret Injection

- Preview workflows use `DOPPLER_PREVIEW_TOKEN`.
- Production workflows use `DOPPLER_PRODUCTION_TOKEN`.
- Secrets are injected at runtime so local source never stores environment secrets.

## Fastlane Entrypoints

### Android (`android/fastlane/Fastfile`)

- `pr_deploy` — PR preview to Firebase App Distribution.
- `deploy_android_production` — Production deploy to Google Play.
- `android_permanent_preview` — Signed preview artifact for GitHub Release.
- `pr_cleanup` — Cleanup for closed PRs.

### iOS (`ios/fastlane/Fastfile`)

- `pr_deploy` — PR preview to TestFlight.
- `production_deploy` — Production deploy to App Store Connect.
- `ios_permanent_preview` — Signed preview artifact for GitHub Release.
- `pr_cleanup` — Cleanup for closed PRs.

## Where to File Issues

Use the `Devops` label on GitHub issues for pipeline or deployment issues.

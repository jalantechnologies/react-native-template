# Automation & Tooling

This project uses GitHub Actions, Doppler, and Fastlane to build, test, and ship the app. This page maps where things live and what each piece does.

## GitHub Workflows

Read more detailed working of CI/CD in [CI](./ci.md) and [CD](./cd.md).

- [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) — Pull-request checks (lint, type-check, SonarQube).
- [`.github/workflows/cd.yml`](../.github/workflows/cd.yml) — PR preview deployments (Android → Firebase App Distribution, iOS → TestFlight) with version and release-notes gates.
- [`.github/workflows/production.yml`](../.github/workflows/production.yml) — Deploys `main` to Google Play (internal track) and App Store Connect.
- [`.github/workflows/permanent_preview.yml`](../.github/workflows/permanent_preview.yml) — Builds signed preview APK/IPA on every `main` push and publishes them to a GitHub Release.
- [`.github/workflows/clean.yml`](../.github/workflows/clean.yml) — Cleans preview artifacts when a PR is closed.

## Local GitHub Actions (reusable)

- [`.github/actions/inject_doppler_secrets`](../.github/actions/inject_doppler_secrets) — Pulls env-specific secrets from Doppler and writes `.env`.
- [`.github/actions/release_notes_check`](../.github/actions/release_notes_check) — Validates [`docs/release_notes/{version}.md`](./release_notes/) (exists, non-empty, ≤ 500 chars) and outputs the text.
- [`.github/actions/deploy_android_preview`](../.github/actions/deploy_android_preview) / [`deploy_ios_preview`](../.github/actions/deploy_ios_preview) — Build + ship PR previews to Firebase App Distribution / TestFlight and surface links.
- [`.github/actions/update_preview_comment`](../.github/actions/update_preview_comment) — Posts/updates PR comment with preview links.
- [`.github/actions/deploy_android_production`](../.github/actions/deploy_android_production) / [`deploy_ios_production`](../.github/actions/deploy_ios_production) — Store uploads for `main`.
- [`.github/actions/permanent_preview_android`](../.github/actions/permanent_preview_android) / [`permanent_preview_ios`](../.github/actions/permanent_preview_ios) / [`permanent_preview_release`](../.github/actions/permanent_preview_release) — Build signed artifacts and publish GitHub Release.
- [`.github/actions/setup-fastlane`](../.github/actions/setup-fastlane) — Installs Fastlane dependencies for cleanup workflow.

## Doppler Secret Injection

- Local action: [`.github/actions/inject_doppler_secrets`](../.github/actions/inject_doppler_secrets)
- Tokens: `DOPPLER_PREVIEW_TOKEN` (preview) and `DOPPLER_PRODUCTION_TOKEN` (production).
- Behavior: fetches environment-specific secrets from Doppler and writes `.env` so builds match their target environment. Used across preview, production, and permanent-preview workflows.

## Release Notes & Version Gates

- Version source: [`package.json`](../package.json).
- Release notes: [`docs/release_notes/{version}.md`](./release_notes/) (must exist, non-empty, ≤ 500 chars).
- Enforced in preview ([`cd.yml`](../.github/workflows/cd.yml)), production, and permanent-preview workflows before any deploy happens.

## Fastlane Entrypoints

### Android (`android/fastlane/Fastfile`)

- `pr_deploy` — Build and upload PR preview to Firebase App Distribution.
- `deploy_android_production` — Build signed bundle and upload to Google Play (internal track).
- `android_permanent_preview` — Build signed preview APK for GitHub Release.
- `pr_cleanup` — Remove preview builds from Firebase when PRs close.

### iOS (`ios/fastlane/Fastfile`)

- `pr_deploy` — Build and upload PR preview to TestFlight with per-PR build number.
- `production_deploy` — Build and upload to App Store Connect.
- `ios_permanent_preview` — Build signed preview IPA for GitHub Release.
- `pr_cleanup` — Remove preview TestFlight builds when PRs close.

## Where to File Issues

Use the `Devops` label on GitHub issues for pipeline or deploy problems.

# Automation & Tooling

This project uses GitHub Actions, Doppler, and Fastlane to build, test, and ship the app. This page maps where things live and what each piece does.

## GitHub Workflows

- `.github/workflows/ci.yml` — Pull-request checks (lint, type-check, SonarQube).
- `.github/workflows/cd.yml` — PR preview deployments (Android → Firebase App Distribution, iOS → TestFlight) with version and release-notes gates.
- `.github/workflows/production.yml` — Deploys `main` to Google Play (internal track) and App Store Connect.
- `.github/workflows/permanent_preview.yml` — Builds signed preview APK/IPA on every `main` push and publishes them to a GitHub Release.
- `.github/workflows/clean.yml` — Cleans preview artifacts when a PR is closed.

## Doppler Secret Injection

- Local action: `.github/actions/inject_doppler_secrets`
- Tokens: `DOPPLER_PREVIEW_TOKEN` (preview) and `DOPPLER_PRODUCTION_TOKEN` (production).
- Behavior: fetches environment-specific secrets from Doppler and writes `.env` so builds match their target environment. Used across preview, production, and permanent-preview workflows.

## Release Notes & Version Gates

- Version source: `package.json`.
- Release notes: `docs/release_notes/{version}.md` (must exist, non-empty, ≤ 500 chars).
- Enforced in preview (`cd.yml`), production, and permanent-preview workflows before any deploy happens.

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

Use the `CI/CD` label on GitHub issues for pipeline or deploy problems.

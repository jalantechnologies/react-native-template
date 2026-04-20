# CI/CD Pipeline

This document describes the CI/CD pipeline structure and security scanning setup for this React Native template.

## Workflows

| Workflow | Trigger | Purpose |
|---|---|---|
| `ci.yml` | PR opened/updated | Linting, type checking, SonarQube |
| `cd.yml` | PR opened/updated | Preview builds (Android → Firebase, iOS → TestFlight) |
| `production.yml` | Push to `main` (version bump) | Production builds (Android → Play Store, iOS → App Store) |
| `permanent_preview.yml` | Push to `main` (version bump) | Permanent preview APK/IPA published as GitHub Release |
| `version-bump.yml` | PR merged to `main` | Bumps semver, rotates release notes |
| `clean.yml` | PR closed | Cleans up Firebase and TestFlight preview builds |

## Security Scanning

Every deployment workflow runs a security scan **before** the build and upload steps. Deployment is blocked if any **HIGH** or **CRITICAL** vulnerability is found.

### Composite Action: `mobile-scan`

Location: `.github/actions/mobile-scan/action.yml`

Inputs:

| Input | Required | Description |
|---|---|---|
| `android-apk-path` | No | Glob path to a built APK for Ostorlab binary scan |
| `ios-ipa-path` | No | Glob path to a built IPA for Ostorlab binary scan |

Outputs:

| Output | Description |
|---|---|
| `has-issues` | `"true"` if any scan found HIGH/CRITICAL issues |

### Trivy (Source & Dependency Scan)

- Tool: [`aquasecurity/trivy-action`](https://github.com/aquasecurity/trivy-action)
- Scan type: `fs` (filesystem — source code and dependencies)
- Severity threshold: `HIGH,CRITICAL`
- Unfixed vulnerabilities: ignored (`ignore-unfixed: true`)
- Runs on every deployment workflow, always

**To suppress a false positive**, add the CVE ID to `.trivyignore` at the repo root with a comment explaining the reason and review date:

```
# CVE-2025-12345: Transitive dep via X, no fix available (reviewed 2026-01-15)
CVE-2025-12345
```

### Ostorlab (Binary Scan)

- Tool: [`ostorlab/github-action`](https://github.com/ostorlab/ostorlab-github-action)
- Scan types: `android-apk`, `ios-ipa`
- Required secret: `OSTORLAB_API_KEY`
- Runs **only when `android-apk-path` or `ios-ipa-path` inputs are provided**

**Current status:** Binary scanning is wired into the `mobile-scan` action but not yet active, because the current Fastlane lanes combine build and upload in a single command. To enable binary scanning, split each deploy Fastlane lane into a build-only step followed by a scan step, followed by an upload-only step. Then pass the artifact path to `mobile-scan`:

```yaml
- uses: ./.github/actions/mobile-scan
  with:
    android-apk-path: 'android/app/build/outputs/apk/release/*.apk'
```

### Scan Job Placement

In each workflow the scan jobs run after `release_notes_check` and before the build/deploy jobs:

```
release_notes_check
  ├── scan_android → build_android / deploy_android
  └── scan_ios     → build_ios    / deploy_ios
```

### Interpreting Scan Failures

If a scan job fails:

1. Open the failed workflow run and expand the **Trivy source and dependency scan** step.
2. Review the listed CVEs with their severity and affected package.
3. Options to resolve:
   - **Upgrade** the affected package to a fixed version.
   - **Remove** the package if unused.
   - **Suppress** with `.trivyignore` if it is a confirmed false positive or has no available fix (document the reason).
4. Push a fix commit — the scan will re-run automatically.

## Required Secrets

| Secret | Used By | Description |
|---|---|---|
| `DOPPLER_PREVIEW_TOKEN` | cd.yml, permanent_preview.yml | Doppler token for preview environment |
| `DOPPLER_PRODUCTION_TOKEN` | production.yml | Doppler token for production environment |
| `ANDROID_GCP_JSON_BASE64` | deploy_android_preview | GCP service account for Firebase |
| `ANDROID_FIREBASE_*` | deploy_android_preview | Firebase project credentials |
| `GPLAY_SERVICE_ACCOUNT_KEY_JSON` | deploy_android_production | Google Play service account |
| `ANDROID_KEYSTORE_*` | deploy_android_production, permanent_preview_android | Android signing keystore |
| `IOS_MATCH_*` | deploy_ios_* | Fastlane Match certificates |
| `IOS_APP_STORE_*` | deploy_ios_* | App Store Connect API credentials |
| `OSTORLAB_API_KEY` | mobile-scan | Ostorlab API key for binary scanning |

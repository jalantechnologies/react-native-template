# Continuous Delivery

GitHub Actions + Fastlane handle preview, production, and permanent-preview deployments for Android and iOS.

- **Triggers:** PR events (preview deploys), and pushes to `main` (production + permanent preview).
- **Issue routing:** file CD issues in GitHub with the `Devops` label so deployment owners are notified.

## Preview Deployments ([`cd.yml`](../.github/workflows/cd.yml))

**What runs**
- Version check: PR [`package.json`](../package.json) version must be strictly greater than `main`; otherwise the workflow fails and skips deploys.
- Release notes validation: requires [`docs/release_notes/{version}.md`](./release_notes/), non-empty, ≤ 500 characters. The validated text is emitted as workflow output and injected into:
  - [`android/fastlane/metadata/android/en-US/changelogs/default.txt`](../android/fastlane/metadata/android/en-US/changelogs/default.txt)
  - ENV variable for iOS Fastlane upload (“What to Test”)
- Environment injection: Doppler secrets write environment-specific `.env` values for preview builds.
- Android preview build (Firebase App Distribution):
  - Takes `versionNameOverride` from [`package.json`](../package.json)
  - Calculates `versionCodeOverride = major*10000 + minor*100 + patch`
  - Uses `ANDROID_PREVIEW_FLAVOR` (default `preview`) so the `.preview` package installs alongside production.
  - Uploads APK/AAB to Firebase with validated release notes and comments on the PR with the download link.
- iOS preview build (TestFlight):
  - Takes marketing `version` from [`package.json`](../package.json)
  - `build_number` = `<PR_NUMBER><YYMMDDHHMM>` for uniqueness per PR
  - Uses Fastlane with preview signing, attaches release notes, and comments on the PR with build details.
- PR comment summarizes Firebase + TestFlight artifacts.

## Production Deployment ([`production.yml`](../.github/workflows/production.yml))

**Trigger:** push to `main` (post-merge).

**What runs**
- Release notes validation identical to preview (file must exist, non-empty, ≤ 500 chars); writes to Fastlane metadata of both ios and android.
- Doppler secret injection for production env values.
- Android production build → Google Play Internal track:
  - Takes `versionNameOverride` from [`package.json`](../package.json)
  - Calculates `versionCodeOverride = major*10000 + minor*100 + patch`
  - Uses `ANDROID_PRODUCTION_FLAVOR` (default `production`).
- iOS production build → App Store Connect:
  - `version` from [`package.json`](../package.json)
  - `build_number` derived from marketing version (e.g., `1.0.13` → `1000013`).

## Permanent Preview ([`permanent_preview.yml`](../.github/workflows/permanent_preview.yml))

**Trigger:** push to `main` (runs alongside production).

**What runs**
- Validates release notes for the current version and exposes them as outputs.
- Builds Android preview (release-signed) and iOS preview (release-signed) with timestamped build numbers.
- Publishes artifacts to GitHub Actions and to a GitHub Release tagged `preview-v<version>`.

## Release Notes Structure & Gates

Release notes must live at [`docs/release_notes/{version}.md`](./release_notes/) and are enforced in all CD workflows:
- File must exist, be non-empty, and be ≤ 500 characters.
- Content is emitted as workflow output and written to Fastlane metadata for Android/iOS.
- Production runs also write `{versionCode}.txt` beside the default Play Console changelog.

## Environment Variables (GitHub Secrets)

| Name | Purpose |
|------|---------|
| `ANDROID_GCP_JSON_BASE64` | Base64 GCP service account JSON for gcloud/Firebase App Distribution. |
| `ANDROID_FIREBASE_PROJECT_NUMBER` | Firebase project number for Android distribution. |
| `ANDROID_FIREBASE_APP_ID` | Firebase App Distribution app ID. |
| `ANDROID_FIREBASE_PROJECT_ID` | Firebase project ID for console links. |
| `ANDROID_FIREBASE_APP_PACKAGE` | Android package used in Firebase (preview uses `<base>.preview`). |
| `ANDROID_PREVIEW_FLAVOR` | Preview flavor (default `preview`). |
| `ANDROID_PRODUCTION_FLAVOR` | Production flavor (default `production`). |
| `ANDROID_APP_IDENTIFIER` | Android applicationId for Play uploads. |
| `ANDROID_FIREBASE_API_KEY` | Firebase API key for Android deploys. |
| `ANDROID_KEYSTORE_FILE` | Base64 keystore for signing Android builds. |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore password. |
| `ANDROID_KEY_ALIAS` | Keystore alias. |
| `ANDROID_KEY_PASSWORD` | Key alias password. |
| `GPLAY_SERVICE_ACCOUNT_KEY_JSON` | Play Console service account key for uploads. |
| `SONAR_TOKEN` | SonarQube auth token (used in CI checks). |
| `SONAR_HOST_URL` | SonarQube server URL. |
| `DOPPLER_PREVIEW_TOKEN` | Doppler token for preview env injection. |

### iOS Secrets

| Name | Purpose |
|------|---------|
| `IOS_APPLE_ID` | Apple Developer App-specific Apple ID. |
| `IOS_APP_IDENTIFIER` | iOS bundle identifier. |
| `IOS_APP_STORE_CONNECT_API_KEY_B64` | Base64 App Store Connect API key (.p8). |
| `IOS_APP_STORE_CONNECT_API_KEY_ID` | App Store Connect API key ID. |
| `IOS_APP_STORE_CONNECT_API_KEY_ISSUER_ID` | App Store Connect API issuer ID. |
| `IOS_APP_STORE_TEAM_ID` | App Store Connect Team ID. |
| `IOS_DEV_EMAIL` | Apple Developer account email. |
| `IOS_KEYCHAIN_PASSWORD` | Password for the temporary CI keychain. |
| `IOS_MATCH_DEPLOY_KEY` | SSH key for Match certificates repo. |
| `IOS_MATCH_PASSWORD` | Match repo decryption password. |
| `IOS_MATCH_REPOSITORY_URL` | Git URL for Match certificates/profiles. |

## Workflow Summaries

**Android PR Preview → Firebase App Distribution**
- Trigger: PR open/update/ready-for-review.
- Sets version name from `package.json`; computes version code from semantic version; builds preview flavor; uploads with release notes; comments on PR with download link.

**iOS PR Preview → TestFlight**
- Trigger: PR open/update/ready-for-review.
- Sets marketing version from `package.json`; build number `<PR_NUMBER><YYMMDDHHMM>`; uses Match signing; uploads to TestFlight with release notes; comments on PR.

**Preview Cleanup on PR Close**
- Cleans preview artifacts to prevent stale installs.

**Production Release**
- Trigger: push to `main`.
- Ships Android to Play Internal and iOS to App Store Connect after release-notes validation.

**Permanent Preview**
- Trigger: push to `main`.
- Publishes signed preview artifacts to GitHub Release `preview-v<version>`.

**Issues related CD**
- For any issue related to whole CI/CD, create a github issue with proper description with the `Devops` label, and any other labels that may apply.

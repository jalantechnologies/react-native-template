# 📦 CI/CD Pipeline Overview

This repository uses **GitHub Actions** combined with **Fastlane** to automate the build, testing, and deployment process for the Android and iOS apps. The primary goals of this CI/CD setup are:

- 🚀 **Fast feedback** on pull requests by distributing builds via **Firebase App Distribution** for **Android** and **TestFlight** for **iOS**.
- 📋 **Mandatory release notes** validation before any deployment.
- 🧹 **Automatic cleanup** of test builds when a PR is closed.
- 🔒 **Secure handling** of credentials using **GitHub Actions Secrets**.
- 📦 **Automated version synchronization** from `package.json` to Android and iOS.

This ensures contributors and QA can quickly test PR builds without manually compiling the app, and stale builds are cleaned up automatically.

### ✔ CI Checks (Fast & Parallel)

The `ci.yml` workflow runs two core CI jobs:
- **ci/lint** – Linting directly on source code  
- **ci/sonarqube** – Code quality analysis for pull requests  

These jobs run **independently and in parallel**, improving feedback time.

***

## 🚀 CD Workflows

### 📱 Preview Deployment (`cd_preview.yml`)

**Triggers:** Pull request opened, synchronized, reopened, or marked ready for review

**Flow:**
```
release-notes-check → build → deploy_android_preview + deploy_ios_preview (parallel)
``````

**What it does:**
1. **Release Notes Check** – Validates that `docs/release_notes/{version}.md` exists for the current `package.json` version
2. **Build** – Builds Docker image with preview configuration and syncs version from `package.json`
3. **Deploy Android Preview** – Deploys to Firebase App Distribution with release notes
4. **Deploy iOS Preview** – Deploys to TestFlight with release notes (runs in parallel with Android)

**Key Features:**
- ✅ Blocks deployment if release notes are missing
- ✅ Automatically attaches release notes to Firebase and TestFlight
- ✅ Comments on PR with Firebase console link
- ✅ Skips draft PRs automatically

---

### 🏭 Production Deployment (`cd_production.yml`)

**Triggers:** Push to `main` branch

**Flow:**
```
release-notes-check → build → deploy-android + deploy-ios (parallel)
``````

**What it does:**
1. **Release Notes Check** – Validates that `docs/release_notes/{version}.md` exists for the current `package.json` version
2. **Build** – Builds Docker image with production configuration and syncs version from `package.json`
3. **Deploy Android** – Deploys to Google Play Console (internal track, draft) with release notes
4. **Deploy iOS** – Deploys to App Store with release notes (runs in parallel with Android)

**Key Features:**
- ✅ Blocks deployment if release notes are missing
- ✅ Automatically attaches release notes to Play Store and App Store
- ✅ Version code synced from `package.json` using formula: `(major * 10000) + (minor * 100) + patch`
- ✅ Parallel Android and iOS deployments reduce total deployment time

***

## 📋 Release Notes Structure

Release notes must be created in `docs/release_notes/{version}.md` before deployment:

```
docs/
└── release_notes/
    ├── 1.0.0.md
    ├── 1.0.1.md
    └── 1.1.0.md
``````

**Example release notes file (`docs/release_notes/1.0.1.md`):**
```
# v1.0.1 Release Notes

## Features
- Added new user authentication flow
- Improved performance on low-end devices

## Bug Fixes
- Fixed crash on app startup
- Resolved memory leak in image cache

## Known Issues
- Dark mode not fully supported on Android 10
``````

***

## 🔧 Environment Variables

These environment variables are used by the GitHub Actions workflows and Fastlane scripts to authenticate, configure builds, and upload to deployment platforms.

| Name                            | Source                | Description                                                                                                                                         |
|---------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `ANDROID_GCP_JSON_BASE64`       | GitHub Secret         | Base64-encoded GCP service account JSON. Decoded and written to `/tmp/gcp_key.json` to authenticate `gcloud` and Firebase App Distribution.        |
| `ANDROID_FIREBASE_PROJECT_NUMBER` | GitHub Secret       | Firebase project number for Android app distribution.                                                                                              |
| `ANDROID_FIREBASE_APP_ID`       | GitHub Secret         | Firebase App Distribution app ID for the Android app.                                                                                              |
| `ANDROID_FIREBASE_PROJECT_ID`   | GitHub Secret         | Firebase project ID used for console links.                                                                                                        |
| `ANDROID_FIREBASE_APP_PACKAGE`  | GitHub Secret         | Android app package name used in Firebase.                                                                                                         |
| `ANDROID_FIREBASE_API_KEY`      | GitHub Secret         | Firebase API key for Android deployment.                                                                                                           |
| `ANDROID_KEYSTORE_FILE`         | GitHub Secret         | Base64-encoded Android keystore file. Decoded and used to sign Android builds during Play Store deployments.                                       |
| `ANDROID_KEYSTORE_PASSWORD`     | GitHub Secret         | Password for the Android keystore file used in signing builds.                                                                                     |
| `ANDROID_KEY_ALIAS`             | GitHub Secret         | Alias used inside the keystore to refer to the signing key.                                                                                        |
| `ANDROID_KEY_PASSWORD`          | GitHub Secret         | Password for the key alias used in Android app signing.                                                                                            |
| `DOPPLER_PREVIEW_TOKEN`         | GitHub Secret         | Used to inject preview environment secrets via Doppler during PR builds and checks.                                                                |
| `DOPPLER_PRODUCTION_TOKEN`      | GitHub Secret         | Used to inject production environment secrets via Doppler during production builds and checks.                                                     |
| `DOCKER_PASSWORD`               | GitHub Secret         | Docker registry password used for authenticating image pulls and pushes in CI.                                                                     |
| `GPLAY_SERVICE_ACCOUNT_KEY_JSON`| GitHub Secret         | Google Play service account key for uploading Android production builds via Fastlane and GitHub Action.                                            |
| `SONAR_TOKEN`                   | GitHub Secret         | Authentication token for SonarQube analysis API access.                                                                                            |
| `SONAR_HOST_URL`                | GitHub Secret         | URL of your SonarQube server used in PR and branch scan jobs.                                                                                      |

### iOS Variables (TestFlight & App Store Deploy)

| Name                                   | Source        | Description                                                                                                                                           |
|----------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `IOS_APPLE_ID`                         | GitHub Secret | Apple Developer App-specific Apple ID. Used by Fastlane and App Store Connect APIs for identifying the app owner.                                    |
| `IOS_APP_IDENTIFIER`                   | GitHub Secret | iOS app bundle identifier. Used during iOS build and upload processes.                                                                                |
| `IOS_APP_STORE_CONNECT_API_KEY_B64`    | GitHub Secret | Base64-encoded contents of your App Store Connect API key (.p8 file). Used by Fastlane for secure authentication with Apple APIs.                   |
| `IOS_APP_STORE_CONNECT_API_KEY_ID`     | GitHub Secret | App Store Connect API Key ID. Used by Fastlane to authenticate securely with App Store Connect.                                                      |
| `IOS_APP_STORE_CONNECT_API_KEY_ISSUER_ID` | GitHub Secret | App Store Connect API Issuer ID. Used in conjunction with API Key ID and Base64 key to authenticate.                                              |
| `IOS_APP_STORE_TEAM_ID`                | GitHub Secret | Your App Store Connect Team ID (can be found in App Store Connect or developer.apple.com). Required for uploading builds and managing certificates.|
| `IOS_DEV_EMAIL`                        | GitHub Secret | Apple Developer account email used for authentication or account identification in Fastlane.                                                         |
| `IOS_KEYCHAIN_PASSWORD`                | GitHub Secret | Password for the temporary macOS CI keychain used to store signing certificates during iOS builds.                                                   |
| `IOS_MATCH_DEPLOY_KEY`                 | GitHub Secret | SSH private key with read access to your Match certificate repository. Used to fetch provisioning profiles during CI.                                |
| `IOS_MATCH_PASSWORD`                   | GitHub Secret | Password for the Match encryption repo (used by Fastlane Match to decrypt signing certificates and provisioning profiles).                           |
| `IOS_MATCH_REPOSITORY_URL`             | GitHub Secret | The Git URL of the private repository used by Fastlane Match to store signing certificates and provisioning profiles.                                |

These variables are decoded and written to disk during the CI process so tools like Fastlane or deployment APIs can use them.

***

## 📦 Version Management

Version management is centralized in `package.json` and automatically synced to Android and iOS using the `sync_versions` Fastlane lane.

**Version Code Formula:**
```ruby
version_code = (major * 10000) + (minor * 100) + patch
``````

**Examples:**
- `1.0.0` → `10000`
- `1.3.7` → `10307`
- `2.5.12` → `20512`

**What gets updated:**
- Android: `versionCode` and `versionName` in `build.gradle`
- iOS: `CFBundleShortVersionString` and `CFBundleVersion` in `Info.plist`

---
## 🧪 Local Testing

You can test CI/CD behavior locally using Fastlane to simulate the GitHub Actions environment.

### Deploy a PR build:

```bash
cd android
bundle exec fastlane android pr_deploy \
  pr_number:123 \
  json_key_file:"<GPLAY_SERVICE_ACCOUNT_KEY_JSON>" \
  package_name:"<ANDROID_APP_PACKAGE>"

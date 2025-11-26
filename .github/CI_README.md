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

### ✔ CD Checks
## Preview Deployments (`cd.yml`)

**When it runs:**
PR opened, updated, reopened, or marked ready for review

**What it does:**

* Validates release notes for the current version
* Build and Deploy Android (Firebase App Distribution)
* Build and Deploy iOS (TestFlight)
* Comments on the PR with Firebase preview link

**Why it matters:**
Ensures every PR has proper release notes (If no release notes, workflow will fail), produces installable preview builds, and keeps QA feedback fast.

---
## Production Deployment (`production.yml`)

**When it runs:**
Push to `main`

**What it does:**

* Validates release notes
* Build and Deploys Android app to Google Play Console
* BUild and Deploys iOS app to App Store

**Why it matters:**
Guarantees only versioned, documented builds go to the stores — with release notes and version codes handled automatically.

---

## 📋 Release Notes Structure

Release notes must be created in `docs/release_notes/{version}.md` before deployment:

```
docs/
└── release_notes/
    ├── 1.0.0.md
    ├── 1.0.1.md
    └── 1.1.0.md
```

### 🔁 Automated PR Version Bump

- Whenever a PR targeting `main` is opened, the `auto-version-bump.yml` workflow checks out the PR branch, runs `yarn version:bump patch`, commits the updated `package.json`, `yarn.lock`, and release-note stub, then pushes the commit.
- The generated release note remains a template—developers must edit the markdown file with store-ready notes before merging.
- If you need a `minor` or `major` increment, run the script locally and push the change before opening the PR (or update it after the automation runs).

---

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
---
## 🚀 CD Workflow Summary

### 1. 🔄 PR Build & Deploy to Firebase App Distribution

**Why?**  
To enable quick testing and feedback for each PR by distributing `.apk` builds to testers on the **Firebase App Distribution**.

**How?**
- Triggered on PR open, reopen, or update (`pull_request` events)
- Uses Fastlane’s `pr_deploy` lane to:
  - Build the `.apk` with Gradle (`assembleDebug`)
  - Upload the `.apk` to **Firebase App Distribution** via Firebase API
  - Set release notes with the PR number and title
  - Comment on the PR with the release details (URL, build info)

---

### 2. 🧹 Google Play Cleanup on PR Close

**Why?**  
To prevent clutter in Google Play Console Internal Testing by automatically removing builds for closed PRs.

**How?**
- Triggered on PR close (`pull_request.closed`)
- Uses Fastlane’s `pr_cleanup` lane to:
  - Authenticate with Google Play Console using the service account
  - Fetch releases with matching PR identifiers in their release notes
  - Call the Google Play Console API to delete the releases

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

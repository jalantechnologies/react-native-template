# 📦 CI/CD Pipeline Overview

This repository uses **GitHub Actions** combined with **Fastlane** to automate the build, testing, and deployment process for the Android and iOS apps. The primary goals of this CI/CD setup are:

- 🚀 **Fast feedback** on pull requests by distributing builds via **Firebase App Distribution** for **Android** and **TestFlight** for **iOS**.
- 📋 **Mandatory release notes** and **version** validation before any deployment.
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

* Confirms the PR `package.json` version is newer than `main` before any deploy logic runs.
* Validates release notes for the current version: the file must exist at `docs/release_notes/{version}.md`, be non-empty, and stay at or under **500 characters**. The validated text is emitted as workflow output and copied into `android/fastlane/metadata/android/en-US/changelogs/default.txt` for downstream tooling.
* Builds and deploys Android (Firebase App Distribution) with explicit Gradle overrides so CI never uses manifest defaults:
  * `versionNameOverride` comes from `package.json`.
  * `versionCodeOverride` is derived from the semantic version (`major*10000 + minor*100 + patch`).
* Builds and deploys iOS (TestFlight).
* Comments on the PR with the Firebase preview link.

**Why it matters:**
Ensures every PR has proper release notes (If no release notes, workflow will fail), produces installable preview builds, and keeps QA feedback fast.

---
## Production Deployment (`production.yml`)

**When it runs:**
Push to `main`

**What it does:**
* Confirms the PR `package.json` version is newer than `main` before any deploy logic runs.
* Validates release notes with the same presence/non-empty/≤500 character rules; copies the text to `android/fastlane/metadata/android/en-US/changelogs/default.txt` and emits the content as workflow output. For production runs, Fastlane also writes a `{versionCode}.txt` changelog using the final version code.
* Builds and deploys the Android app to Google Play Console. Gradle receives the `package.json` version as `versionNameOverride` and the latest Play Console version code (fetched then incremented) as `versionCodeOverride` so store uploads align with live numbering.
* Uses the `package.json` version for iOS and deploys to the App Store/TestFlight.

**Why it matters:**
Guarantees only versioned, documented builds go to the stores — with release notes and version codes handled automatically.

---

## 📋 Release Notes Structure

Release notes for previews and production:
Must be created in `docs/release_notes/{version}.md` before deployment:

```
docs/
└── release_notes/
    ├── 1.0.0.md
    ├── 1.0.1.md
    └── 1.1.0.md
``````

Additional rules enforced by `release_notes_check` in both CD workflows:

- The release note file for the current version **must exist**, cannot be empty, and must be **≤ 500 characters**. The version is read from `package.json`.
- The validated content is emitted as a workflow output and written to `android/fastlane/metadata/android/en-US/changelogs/default.txt` for downstream Fastlane steps.
- Production runs also write `{versionCode}.txt` beside the default file using the Play Console version code that is fetched and incremented during the run.

---

## 🔧 Environment Variables

These environment variables are used by the GitHub Actions workflows and Fastlane scripts to authenticate, configure builds, and upload to deployment platforms.

| Name                            | Source                | Description                                                                                      |
|---------------------------------|-----------------------|-------------------------------------------------------------------------------------------------|
| `ANDROID_GCP_JSON_BASE64`       | GitHub Secret         | Base64-encoded GCP service account JSON. Decoded and written to `/tmp/gcp_key.json` to authenticate `gcloud` and Firebase App Distribution.        |
| `ANDROID_FIREBASE_PROJECT_NUMBER` | GitHub Secret       | Firebase project number for Android app distribution.                                                                                       |
| `ANDROID_FIREBASE_APP_ID`       | GitHub Secret         | Firebase App Distribution app ID for the Android app.                                                                                       |
| `ANDROID_FIREBASE_PROJECT_ID`   | GitHub Secret         | Firebase project ID used for console links.                                                                                       |
| `ANDROID_FIREBASE_APP_PACKAGE`  | GitHub Secret         | Android app package name used in Firebase.                                                                                       |
| `ANDROID_FIREBASE_API_KEY`      | GitHub Secret         | Firebase API key for Android deployment.                                                                                       |
| `KEYSTORE_FILE`         | GitHub Secret         | Base64-encoded Android keystore file. Decoded and used to sign Android builds during Play Store deployments.                                       |
| `KEYSTORE_PASSWORD`     | GitHub Secret         | Password for the Android keystore file used in signing builds.                                                                               |
| `KEY_ALIAS`             | GitHub Secret         | Alias used inside the keystore to refer to the signing key.                                                                               |
| `KEY_PASSWORD`          | GitHub Secret         | Password for the key alias used in Android app signing.                                                                               |
| `GPLAY_SERVICE_ACCOUNT_KEY_JSON`| GitHub Secret         | Google Play service account key for uploading Android production builds via Fastlane and GitHub Action.                                            |
| `SONAR_TOKEN`                   | GitHub Secret         | Authentication token for SonarQube analysis API access.                                                                                       |
| `SONAR_HOST_URL`                | GitHub Secret         | URL of your SonarQube server used in PR and branch scan jobs.                                                                                      |

### iOS Variables (TestFlight & App Store Deploy)

| Name                                   | Source        | Description                                                                                          |
|----------------------------------------|---------------|------------------------------------------------------------------------------------------------------|
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
To enable quick testing and feedback for each PR by distributing `.apk` builds to testers on **Firebase App Distribution**.

**How?**

* Triggered on PR open, reopen, or update (`pull_request` events)
* Uses Fastlane’s `pr_deploy` lane to:

  * Build the `.apk` with Gradle (`assembleDebug`)
  * Upload the build to Firebase App Distribution
  * Attach release notes containing the PR number/title
  * Comment on the PR with a link to the uploaded build

---

### 2. 🧹 Google Play Cleanup on PR Close

**Why?**
To keep Google Play Internal Testing clean by removing preview builds once a PR is closed.

**How?**

* Triggered on PR close (`pull_request.closed`)
* Uses Fastlane’s `pr_cleanup` lane to:

  * Find releases tagged with the PR number
  * Delete them via the Google Play/Firebase App Distribution API

---

### 3. 📦 Production Build & Deploy to Google Play Console

**Why?**
To publish the final Android build to **Google Play Console (Internal track)** when changes are merged.

**How?**

* Triggered on push to `main`
* Uses Fastlane’s `deploy_android_production` lane to:

  * Fetch and increment the versionCode from Google Play
  * Build the signed release bundle (`.aab`)
  * Automatically pick up release notes stored in
    `fastlane/metadata/android/en-US/changelogs/{versionCode}.txt`
    (falls back to `default.txt` if missing)
  * Upload the bundle to Google Play Internal track with `draft` status

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
```

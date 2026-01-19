# 📦 CI/CD Pipeline Overview

This repository uses **GitHub Actions** combined with **Fastlane** to automate the build, testing, and deployment process for the Android and iOS apps. The primary goals of this CI/CD setup are:

- 🚀 **Fast feedback** on pull requests by distributing builds via **Firebase App Distribution** for **Android** and **TestFlight** for **iOS**.
- 📋 **Mandatory release notes** and **version** validation before any deployment.
- 🧹 **Automatic cleanup** of test builds when a PR is closed.
- 🔒 **Secure handling** of credentials using **GitHub Actions Secrets** and **Doppler Secrets** Injection.
- 📦 **Automated version synchronization** from `package.json` to Android and iOS.

This ensures contributors and QA can quickly test PR builds without manually compiling the app, and stale builds are cleaned up automatically.

### ✔ CI Checks (Fast & Parallel)

The `ci.yml` workflow runs two core CI jobs:
- **ci/lint** – Linting directly on source code
- **ci/sonarqube** – Code quality analysis for pull requests

These jobs run **independently and in parallel**, improving feedback time.

***

## ✔ CD Checks

### Preview Deployments (`cd.yml`)

**When it runs**

* Confirms the PR `package.json` version is newer than `main` before any deploy logic runs.
* Validates release notes for the current version: the file must exist at `docs/release_notes/{version}.md`, be non-empty, and stay at or under **500 characters**. The validated text is emitted as workflow output and copied into `android/fastlane/metadata/android/en-US/changelogs/default.txt` as well as exported as ENV variable, which is used for IOS testflight upload.
* Builds and deploys Android (Firebase App Distribution) with explicit Gradle overrides so CD never uses manifest defaults:
  * `versionNameOverride` comes from `package.json`.
  * `versionCodeOverride` is derived from the semantic version (`major*10000 + minor*100 + patch`).
* Builds and deploys iOS (TestFlight) with build number generated with combination of PR + Timestamp.
* Comments on the PR with the Firebase and Testflight Link

**What it does**

- Validates that the PR’s `package.json` **version** is strictly greater than the version on `main`.  
  If the version is not bumped, the workflow fails and no deployment occurs.
- Validates **release notes** for the current version:
  - Expects a file at `docs/release_notes/{version}.md`.
  - File must be non-empty and ≤ **500 characters** (after trimming whitespace).
  - The validated snippet is exposed as workflow output and injected into:
    - `android/fastlane/metadata/android/en-US/changelogs/preview.txt` (or similar) for Firebase notes.
    - exported as an ENV variable and passed to ios preview fastlane script for TestFlight “What to Test”.
- Injects environment variables from **Doppler** into `.env` files:
  - Uses environment-specific configs (Preview vs Production).
  - Overwrites runtime config for both Android and iOS builds for consistency with target environment.
- Builds and deploys **Android preview** to **Firebase App Distribution**:
  - `versionNameOverride` is taken from `package.json` (e.g., `1.2.3`).
  - `versionCodeOverride` is computed from semantic version as  
    `major * 10000 + minor * 100 + patch` (e.g., `1.2.3 → 10203`).
  - Uploads the `.apk` (or `.aab` for preview if configured) to a preview group.
  - Attaches the same validated release notes as Firebase release notes.
- Builds and deploys **iOS preview** to **TestFlight**:
  - Marketing `version` comes from `package.json`.
  - `build_number` is computed by:
    - Using the combination of the PR number + timestamp to differentiate builds for different PR.
    - Build number pattern: <PR_NUMBER><YYMMDDHHMM>.
  - Uses Fastlane to:
    - Build the IPA with App Store signing (manual for the main app target).
    - Strip Hermes bitcode and re-sign frameworks if needed.
    - Attaches release notes content while uploading the app to testflight.
- Adds a **PR comment** summarizing preview artifacts:
  - Firebase App Distribution link for the Android build.
  - TestFlight build information / link for the iOS build.

**Why it matters**

This workflow enforces semantic versioning and release notes at PR time, ensures environment-correct configuration via Doppler, and produces installable preview builds on both Android and iOS so QA and stakeholders can test every change before merge.

***

### Production Deployment (`production.yml`)

**When it runs**

- On `push` events to the `main` branch (typically after PR merge).

**What it does**

- Builds and signs Android and iOS release artifacts with production credentials.
- Publishes Android to **Google Play** Internal track and iOS builds to **App Store Connect** for review.
- Fails fast if any of the signing, versioning, or upload steps are inconsistent with the current state in Google Play or App Store Connect.

**When it runs:**
Push to `main`

**What it does:**
* Validates release notes for the current version: the file must exist at `docs/release_notes/{version}.md`, be non-empty, and stay at or under **500 characters**. The validated text is emitted as workflow output and copied into **fastlane metadata** folders of both android and ios for downstream tooling.
* Uses Doppler Secret Injection in the workflows, to fetch and overwrite the .env of the project with the secret variables, dependent on the environment i.e. Production / Preview (Development)
* Builds and deploys Android apk to **Google Play Console**:
  * `versionNameOverride` comes from `package.json`.
  * `versionCodeOverride` is derived from the semantic version (`major*10000 + minor*100 + patch`).
* Builds and deploys iOS to the **Apple Store Connect**:
  * `version` number comes from `package.json`.
  * `build_number` is calculated by encoding the version / marketing version (e.g. "1.0.13" -> "1000013").

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
- As well as the content of the release notes is given as an output and then set as an ENV variable, so that workflows and fastlane scripts can use them to pass along with the builds.
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
| `IOS_PREVIEW_APP_IDENTIFIER`           | GitHub Secret | Preview iOS app bundle identifier (e.g., `com.company.app.preview`). Used for TestFlight preview builds and cleanup.                                   |
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

### 1. 🔄 PR Build & Deploy to Firebase App Distribution (Android)

**Why?**  
To enable quick testing and feedback for each PR on Android by distributing preview builds to testers via **Firebase App Distribution**.

**How?**

- Triggered on PR open, reopen, update, or ready-for-review.
- Uses an Android Fastlane lane (e.g., `android pr_deploy`) to:
  - Read the semantic version from `package.json`.
  - Compute `versionCode` as `major * 10000 + minor * 100 + patch`.
  - Build the app with Gradle (`assembleDebug` or preview flavor).
  - Upload the artifact to Firebase App Distribution with:
    - Target testers / groups.
    - Release notes based on the validated `docs/release_notes/{version}.md`.
  - Comment on the PR with:
    - Firebase download link.
    - Version and build information.

***

### 2. 🔄 PR Build & Deploy to TestFlight (iOS)

**Why?**  
To provide parity with Android preview builds by shipping an iOS TestFlight build for every PR, with the same versioning and release notes.

**How?**

- Triggered by the same PR events as the Android preview workflow.
- Uses an iOS Fastlane lane (e.g., `ios pr_deploy` / `ios_deploy_preview!`) to:
  - Read `version` from `package.json` and set it as the marketing version in the Xcode project.
  - Creates build number by combination of the PR number + timestamp to differentiate builds for different PR, then write it back to the project.
  - Ensure signing via `match` and a dedicated preview keychain.
  - Build the IPA (App Store export) and post-process (Hermes bitcode stripping and re-signing).
  - Read release notes from:
    - `docs/release_notes/{version}.md` → exported as an ENV variable to be used in IOS fastlane scripts and pass it directly.
  - Upload the IPA to **TestFlight** with:
    - “What to Test” populated from `changelog` parameter of `upload_to_testflight` method of fastlane.
    - Internal-only distribution (preview groups).
  - Comment on the PR with:
    - The TestFlight build number / link.

***

### 3. 🧹 Preview Cleanup on PR Close

**Why?**  
To keep preview environments clean and avoid accumulating obsolete builds.

**How?**

- Triggered when a PR is closed (merged or discarded).
- Runs cleanup lanes for both platforms:
  - **Android:** finds Firebase or internal Google Play preview artifacts tagged with the PR number and deletes or expires them.
  - **iOS:** optionally calls a Fastlane cleanup lane (e.g., `ios_cleanup_preview`) that:
    - Uses App Store Connect API to locate TestFlight builds associated with the PR.
    - Expires or removes them from preview groups if configured.

This keeps both Firebase and TestFlight uncluttered and ensures that only active work-in-progress PRs have live preview builds.

***

### 4. 📦 Production Build & Deploy to Google Play Console (Android)

**Why?**  
To automate promotion of tested changes to **Google Play Console (Internal track or higher)** with consistent versioning and release notes.

**How?**

- Triggered on pushes to `main` (or a dedicated release branch, depending on configuration).
- Uses a production Android Fastlane lane (e.g., `deploy_android_production`) to:
  - Determine the next `versionCode` by querying Google Play for the latest existing build and incrementing it.
  - Build the signed release bundle (`.aab`) with the production keystore.
  - Populate release notes from:
    - `fastlane/metadata/android/en-US/changelogs/{versionCode}.txt`,  
      falling back to `default.txt` when specific notes are missing.
  - Upload the bundle to the appropriate Google Play track (typically Internal) as a draft or for review.

***

### 5. 🍏 Production Build & Deploy to App Store Connect (iOS)

**Why?**  
To automate iOS App Store submissions with consistent versioning, build numbers, and release notes derived from the same source as Android.

**How?**

- Triggered together with the Android production deployment on push to `main`.
- Uses an iOS Fastlane lane (e.g., `ios_deploy_production!`) to:
  - Read `version` from `package.json` and set the marketing version in `Boilerplate.xcodeproj`.
  - Compute the next `build_number` by encoding the marketing version ("1.0.13" → 1000013) and update the Xcode project.
  - Use `match` (readonly) and a production keychain for signing.
  - Script reads release notes from release_notes argument and writes content in fastlane/metadata/en-US/release_notes.txt file using release notes helper script, so that it will be passed with the build.
  - Build a release IPA with App Store export options.
  - Upload the IPA to **App Store Connect** via `upload_to_app_store`, skipping screenshots and most metadata because the changelog is handled explicitly.

***

## 🧪 Local Testing

You can exercise most of the CI/CD behavior locally by invoking the same Fastlane lanes that the workflows use.

### Android: deploy a PR build locally

```bash
cd android
bundle exec fastlane android pr_deploy \
  pr_number:123 \
  json_key_file:"<GPLAY_SERVICE_ACCOUNT_KEY_JSON>" \
  package_name:"<ANDROID_APP_PACKAGE>"
```

### iOS: deploy a preview TestFlight build locally

```bash
cd ios
bundle exec fastlane ios pr_deploy \
  pr_number:123 \
  app_identifier:"<IOS_BUNDLE_ID>" \
  api_key_id:"<ASC_API_KEY_ID>" \
  issuer_id:"<ASC_API_ISSUER_ID>" \
  api_key_b64:"<BASE64_P8_CONTENT>" \
  keychain_name:"ios.preview.keychain" \
  keychain_password:"<KEYCHAIN_PASSWORD>" \
  team_id:"<APPLE_TEAM_ID>"
```

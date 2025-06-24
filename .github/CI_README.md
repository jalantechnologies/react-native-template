# 📦 CI/CD Pipeline Overview

This repository uses **GitHub Actions** combined with **Fastlane** to automate the build, testing, and deployment process for the Android app. The primary goals of this CI/CD setup are:

- 🚀 **Fast feedback** on pull requests by distributing builds via **Firebase App Distribution**
- 🧹 **Automatic cleanup** of test builds when a PR is closed
- 🔒 **Secure handling** of credentials using **GitHub Actions Secrets**

This ensures contributors and QA can quickly test PR builds without manually compiling the app, and stale builds are cleaned up automatically.

---

## 🔧 Environment Variables

These environment variables are used by the GitHub Actions workflows and Fastlane scripts to authenticate, configure builds, and upload to Firebase or Google Play.

| Name                            | Source                | Description                                                                                                                                         |
|---------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `ANDROID_FIREBASE_PROJECT_NUMBER`       | GitHub Secret  | Firebase project number. Used in Firebase API endpoints for uploading and managing app distribution releases.                                      |
| `ANDROID_FIREBASE_APP_ID`               | GitHub Secret | Unique Firebase Android App ID. Used in Firebase App Distribution API calls to associate the build with the correct app.                           |
| `ANDROID_FIREBASE_PROJECT_ID`           | GitHub Secret | Firebase project ID. Used in Firebase CLI and Firebase Console URLs. Also helpful for identifying the correct project context in scripts.          |
| `ANDROID_FIREBASE_APP_PACKAGE`          | GitHub Secret | Android app package name (e.g., `com.example.app`). Used during Gradle builds and as an identifier when uploading builds to Firebase.              |
| `ANDROID_GCP_JSON_BASE64`               | GitHub Secret         | Base64-encoded GCP service account JSON. Decoded and written to `/tmp/gcp_key.json` to authenticate `gcloud` and Firebase App Distribution APIs.   |                                                                |
| `ANDROID_FIREBASE_API_KEY`             | GitHub Secret         | Firebase Web API key used by the push notification system (e.g., FCM). Typically accessed by the app or backend to interact with Firebase services like messaging. |
| `ANDROID_KEYSTORE_FILE`           | GitHub Secret  | Base64-encoded Android keystore file. Decoded and used to sign Android builds during Firebase and Play Store deployments. |
| `ANDROID_KEYSTORE_PASSWORD`       | GitHub Secret  | Password for the Android keystore file used in signing builds. |
| `ANDROID_KEY_ALIAS`               | GitHub Secret  | Alias used inside the keystore to refer to the signing key. |
| `ANDROID_KEY_PASSWORD`            | GitHub Secret  | Password for the key alias used in Android app signing. |
| `DOPPLER_PREVIEW_TOKEN`           | GitHub Secret  | Used to inject preview environment secrets via Doppler during PR builds and checks. |
| `DOPPLER_PRODUCTION_TOKEN`        | GitHub Secret  | Used to inject production environment secrets via Doppler during production builds and checks. |
| `DOCKER_PASSWORD`                 | GitHub Secret  | Docker registry password used for authenticating image pulls and pushes in CI. |
| `GPLAY_SERVICE_ACCOUNT_KEY_JSON`  | GitHub Secret  | Google Play service account key for uploading Android production builds via Fastlane and GitHub Action. |
| `SONAR_TOKEN`                     | GitHub Secret  | Authentication token for SonarQube analysis API access. |
| `SONAR_HOST_URL`                  | GitHub Secret  | URL of your SonarQube server used in PR and branch scan jobs. |
| `APPLE_ID`                            | GitHub Secret    | Apple Developer App-specific Apple ID. Used by Fastlane and App Store Connect APIs for identifying the app owner.                                    |
| `KEYCHAIN_PASSWORD`                  | GitHub Secret    | Password for the temporary macOS CI keychain used to store signing certificates during iOS builds.                                                   |
| `FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD` | GitHub Secret | App-specific password used by Fastlane to upload builds to TestFlight (required for some Fastlane operations).                                        |
| `APP_STORE_CONNECT_API_KEY_ID`       | GitHub Secret    | App Store Connect API Key ID. Used by Fastlane to authenticate securely with App Store Connect.                                                      |
| `APP_STORE_CONNECT_API_KEY_ISSUER_ID`| GitHub Secret    | App Store Connect API Issuer ID. Used in conjunction with API Key ID and Base64 key to authenticate.                                                 |
| `APP_STORE_CONNECT_API_KEY_B64`      | GitHub Secret    | Base64-encoded contents of your App Store Connect API key (.p8 file). Used by Fastlane for secure authentication with Apple APIs.                    |
| `MATCH_PASSWORD`                     | GitHub Secret    | Password for the Match encryption repo (used by Fastlane Match to decrypt signing certificates and provisioning profiles).                           |
| `MATCH_DEPLOY_KEY`                   | GitHub Secret    | SSH private key with read access to your Match certificate repository. Used to fetch provisioning profiles during CI.                                |
| `IOS_APP_IDENTIFIER`                | GitHub Secret    | iOS app bundle identifier. Used during iOS build and upload processes.                         |

These variables are decoded and written to disk during the CI process so tools like Fastlane or the Firebase CLI can use them.

---

## 🚀 CI Workflow Summary

### 1.  PR Build & Deploy to Firebase App Distribution

**Why?**  
To enable quick testing and feedback for each PR by distributing debug builds to Firebase testers.

**How?**
- Triggered on PR open, reopen, or update (`pull_request` events)
- Uses Fastlane’s `pr_deploy` lane to:
  - Build the APK with Gradle (`assembleDebug`)
  - Upload the APK to Firebase App Distribution via Firebase API
  - Set release notes with the PR number and title
  - Comment on the PR with the release details (URL, build info)

---

### 2.  Firebase Cleanup on PR Close

**Why?**  
To prevent clutter in Firebase App Distribution by automatically removing builds for closed PRs.

**How?**
- Triggered on PR close (`pull_request.closed`)
- Uses Fastlane’s `pr_cleanup` lane to:
  - Authenticate with Firebase using the same service account
  - Fetch releases with matching PR identifiers in their release notes
  - Call the Firebase App Distribution `batchDelete` API to remove them

---
### 3.  PR Build & Deploy to TestFlight (iOS)

**Why?**  
To make iOS preview builds available for testing via TestFlight for every active PR.

**How?**
- Triggered on PR open, reopen, or update (`pull_request` events)  
- Uses Fastlane’s `ios/pr_deploy` lane to:
  - Fetch iOS signing certificates and provisioning profiles using Fastlane Match
  - Build the app using Xcode with `build_app`
  - Upload the build to TestFlight via `upload_to_testflight`
  - Comment on the PR with the TestFlight link and build metadata (App ID, build hash)

---

### 4. TestFlight Cleanup on PR Close (iOS)

**Why?**  
To automatically remove TestFlight builds for closed PRs, keeping TestFlight builds relevant and minimal.

**How?**
- Triggered on PR close (`pull_request.closed`)  
- Uses Fastlane’s `ios/pr_cleanup` lane to:
  - Authenticate with App Store Connect via API Key
  - Identify and remove the TestFlight build associated with the closed PR
  - Helps maintain a clean TestFlight history and avoids orphaned builds

##  Local Testing

You can test CI/CD behavior locally using Fastlane to simulate the GitHub Actions environment.

### Deploy a PR build:

```bash
cd android
bundle exec fastlane android pr_deploy \
  pr_number:123 \
  pr_title:"Fix login bug" \
  project_number:"<FIREBASE_PROJECT_NUMBER>" \
  app_id:"<FIREBASE_APP_ID>"
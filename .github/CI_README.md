# 📦 CI/CD Pipeline Overview

This repository uses **GitHub Actions** combined with **Fastlane** to automate the build, testing, and deployment process for the Android app. The primary goals of this CI/CD setup are:

- 🚀 **Fast feedback** on pull requests by distributing builds via **Firebase App Distribution**
- 🧹 **Automatic cleanup** of test builds when a PR is closed
- 🔒 **Secure handling** of credentials using **GitHub Actions Secrets**

This ensures contributors and QA can quickly test PR builds without manually compiling the app, and stale builds are cleaned up automatically.

---

## 🔧 Environment Variables

These environment variables are used by the GitHub Actions workflows and Fastlane scripts to authenticate, configure builds, and upload to Firebase or Google Play.

| Name                               | Source                | Description                                                                 |
|------------------------------------|------------------------|-----------------------------------------------------------------------------|
| `FIREBASE_PROJECT_NUMBER`          | GitHub Actions `env:`  | Unique numeric ID for the Firebase project. Used in Firebase API URLs.     |
| `FIREBASE_APP_ID`                  | GitHub Actions `env:`  | Unique ID of the Firebase Android app. Required for distribution uploads.  |
| `FIREBASE_PROJECT_ID`              | GitHub Actions `env:`  | Human-readable Firebase project ID, used in Firebase CLI commands.         |
| `FIREBASE_APP_PACKAGE`             | GitHub Actions `env:`  | App's Android package name (e.g. `com.example.app`). Used in Play Console. |
| `GCP_JSON_BASE64`                  | GitHub Secret          | Base64-encoded service account key. Used for Firebase and GCP auth.        |
| `GPLAY_SERVICE_ACCOUNT_KEY_JSON`   | GitHub Secret          | Base64-encoded JSON for Google Play upload auth (internal testing/prod).   |
| `KEYSTORE_FILE`                    | GitHub Secret          | Base64-encoded Android keystore used for signing release builds.           |
| `KEYSTORE_PASSWORD`                | GitHub Secret          | Password for the keystore file.                                             |
| `KEY_ALIAS`                        | GitHub Secret          | Key alias inside the keystore.                                              |
| `KEY_PASSWORD`                     | GitHub Secret          | Password for the key alias.                                                 |

These variables are decoded and written to disk during the CI process so tools like Fastlane or the Firebase CLI can use them.

---

## 🚀 CI Workflow Summary

### 1. 🔄 PR Build & Deploy to Firebase App Distribution

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

### 2. 🧹 Firebase Cleanup on PR Close

**Why?**  
To prevent clutter in Firebase App Distribution by automatically removing builds for closed PRs.

**How?**
- Triggered on PR close (`pull_request.closed`)
- Uses Fastlane’s `pr_cleanup` lane to:
  - Authenticate with Firebase using the same service account
  - Fetch releases with matching PR identifiers in their release notes
  - Call the Firebase App Distribution `batchDelete` API to remove them

---

## 🧪 Local Testing

You can test CI/CD behavior locally using Fastlane to simulate the GitHub Actions environment.

### Deploy a PR build:

```bash
cd android
bundle exec fastlane android pr_deploy \
  pr_number:123 \
  pr_title:"Fix login bug" \
  project_number:"<FIREBASE_PROJECT_NUMBER>" \
  app_id:"<FIREBASE_APP_ID>"

# 📦 CI/CD Pipeline Overview

This repository uses GitHub Actions to automate the build, testing, and deployment of the Android app to:

- **Firebase App Distribution** for PR builds

CI/CD is powered by **Fastlane**, and secrets are configured via **GitHub Actions secrets**.

---

## 🔧 Environment Variables

The following environment variables are defined at the top of the workflow or injected via secrets:

| Name                      | Source                | Description                                                                 |
|---------------------------|-----------------------|-----------------------------------------------------------------------------|
| `FIREBASE_PROJECT_NUMBER` | GitHub Actions `env:` | Firebase project number (visible in GCP or Firebase settings)               |
| `FIREBASE_APP_ID`         | GitHub Actions `env:` | Firebase Android App ID                                                     |
| `FIREBASE_PROJECT_ID`     | GitHub Actions `env:` | Firebase project ID (used in Firebase Console URL)                          |
| `FIREBASE_APP_PACKAGE`  | GitHub Actions `env:` | Android App identifier (e.g., `android:com.example.app`)                    |
| `GCP_JSON_BASE64`         | GitHub Secret         | Base64-encoded GCP service account JSON file used by Firebase CLI/Fastlane |
| `GPLAY_SERVICE_ACCOUNT_KEY_JSON`   | GitHub Secret         | Base64-encoded JSON for Google Play Service Account                         |
| `KEYSTORE_FILE`           | GitHub Secret         | Base64-encoded Android keystore                                             |
| `KEYSTORE_PASSWORD`       | GitHub Secret         | Android keystore password                                                   |
| `KEY_ALIAS`               | GitHub Secret         | Android key alias                                                           |
| `KEY_PASSWORD`            | GitHub Secret         | Android key password                                                        |

---

## 🚀 CI Workflow Summary

### 1. PR Build & Deploy to Firebase

- Triggered on PR open/sync/reopen
- Builds the APK with Fastlane
- Uploads the build to Firebase App Distribution
- Comments on the PR with a Firebase release link

### 2. Cleanup

- Triggered when a PR is closed
- Deletes the Firebase App Distribution release associated with that PR

---

## 🧪 Local Testing

You can test CI lanes locally using:

```sh
cd android
bundle exec fastlane android pr_deploy \
  pr_number:123 \
  pr_title:"Fix login bug" \
  project_number:"<FIREBASE_PROJECT_NUMBER>" \
  app_id:"<FIREBASE_APP_ID>"

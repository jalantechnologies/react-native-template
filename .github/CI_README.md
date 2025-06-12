# CI/CD Pipeline (Android)

This project uses **GitHub Actions** and **Fastlane** to manage CI/CD for the Android app. This includes:

- 🚀 Automatic builds and deployment for pull requests
- 🧹 Cleanup of test builds when PRs are closed

---

## 🔧 GitHub Secrets Required

| Secret Name               | Purpose                                         |
|--------------------------|-------------------------------------------------|
| `GCP_JSON_BASE64`        | Firebase service account (base64-encoded)       |
| `FIREBASE_PROJECT_NUMBER`| Firebase project number (e.g. `7156...`)        |
| `FIREBASE_APP_ID`        | Firebase App ID (e.g. `1:xxx:android:yyy`)      |
| `GPLAY_SERVICE_ACCOUNT_KEY_JSON`  | Play Store service account JSON                 |
| `KEYSTORE_FILE`          | Android keystore file                          |
| `KEYSTORE_PASSWORD`      | Password for the keystore                      |
| `KEY_ALIAS`              | Keystore alias                                 |
| `KEY_PASSWORD`           | Keystore alias password                        |

---

## 🧪 PR Build & Firebase Deployment

- Triggered when a pull request is opened or updated.
- Builds a debug APK and uploads it to Firebase App Distribution.
- Comments on the PR with a link to the release.

### Firebase-specific params:
These are passed from the CI config and **must not be hardcoded**:

- `FIREBASE_PROJECT_NUMBER`
- `FIREBASE_APP_ID`



## 🧹 Cleanup (on PR Close)

When a PR is closed, we:

- Search Firebase for matching test builds (based on PR number)
- Delete those test builds via Firebase API

---

## 📁 Workflow Files

- `.github/workflows/pr_app_distribute.yml` – Handles PR Firebase deploy + cleanup + Play Store
- `Fastfile` – Contains Fastlane lanes:
  - `pr_deploy_firebase`
  - `pr_cleanup`

---

## 🤝 Contribution Guidelines

When modifying CI/CD setup:
- Use environment variables or GitHub secrets for all sensitive/unique config
- Do not hardcode `project_number`, `app_id`, or secrets
- Update this README if pipeline changes

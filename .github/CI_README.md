# 📦 CI/CD Pipeline Overview

This repository uses **GitHub Actions** combined with **Fastlane** to automate the build, testing, and deployment process for the Android app. The primary goals of this CI/CD setup are:

- 🚀 **Fast feedback** on pull requests by distributing builds via **Firebase App Distribution** for **Android** and **TestFlight** for **iOS**.
- 🧹 **Automatic cleanup** of test builds when a PR is closed.
- 🔒 **Secure handling** of credentials using **GitHub Actions Secrets**.

This ensures contributors and QA can quickly test PR builds without manually compiling the app, and stale builds are cleaned up automatically.

### ✔ CI Checks (Fast & Parallel)

The `ci.yml` workflow runs two core CI jobs:
- **ci/lint** – Linting directly on source code  
- **ci/sonarqube** – Code quality analysis for pull requests  

These jobs run **independently and in parallel**, improving feedback time.

---

## 🔧 Environment Variables

These environment variables are used by the GitHub Actions workflows and Fastlane scripts to authenticate, configure builds, and upload to **Google Play Internal Testing**.

| Name                            | Source                | Description                                                                                                                                         |
|---------------------------------|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `ANDROID_GCP_JSON_BASE64`       | GitHub Secret         | Base64-encoded GCP service account JSON. Decoded and written to `/tmp/gcp_key.json` to authenticate `gcloud` and Google Play Console APIs.         |
| `ANDROID_PLAY_DEVELOPER_ID`     | GitHub Secret         | Google Play Developer ID for the associated account. Required for interacting with Google Play APIs.                                               |
| `ANDROID_PLAY_APP_ID`           | GitHub Secret         | Google Play App ID for the Android app, required for identifying and interacting with the specific app on the Play Console.                        |
| `ANDROID_KEYSTORE_FILE`         | GitHub Secret         | Base64-encoded Android keystore file. Decoded and used to sign Android builds during Play Store deployments.                                        |
| `ANDROID_KEYSTORE_PASSWORD`     | GitHub Secret         | Password for the Android keystore file used in signing builds.                                                                                    |
| `ANDROID_KEY_ALIAS`             | GitHub Secret         | Alias used inside the keystore to refer to the signing key.                                                                                       |
| `ANDROID_KEY_PASSWORD`          | GitHub Secret         | Password for the key alias used in Android app signing.                                                                                           |
| `DOPPLER_PREVIEW_TOKEN`         | GitHub Secret         | Used to inject preview environment secrets via Doppler during PR builds and checks.                                                                |
| `DOPPLER_PRODUCTION_TOKEN`      | GitHub Secret         | Used to inject production environment secrets via Doppler during production builds and checks.                                                     |
| `DOCKER_PASSWORD`               | GitHub Secret         | Docker registry password used for authenticating image pulls and pushes in CI.                                                                     |
| `GPLAY_SERVICE_ACCOUNT_KEY_JSON`| GitHub Secret         | Google Play service account key for uploading Android production builds via Fastlane and GitHub Action.                                             |
| `SONAR_TOKEN`                   | GitHub Secret         | Authentication token for SonarQube analysis API access.                                                                                           |
| `SONAR_HOST_URL`                | GitHub Secret         | URL of your SonarQube server used in PR and branch scan jobs.                                                                                      |

### iOS Variables (TestFlight Deploy)

| Name                                   | Source        | Description                                                                                                                                           |
|----------------------------------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `IOS_APPLE_ID`                         | GitHub Secret | Apple Developer App-specific Apple ID. Used by Fastlane and App Store Connect APIs for identifying the app owner.                                       |
| `IOS_APP_IDENTIFIER`                   | GitHub Secret | iOS app bundle identifier. Used during iOS build and upload processes.                                                                                |
| `IOS_APP_STORE_CONNECT_API_KEY_B64`    | GitHub Secret | Base64-encoded contents of your App Store Connect API key (.p8 file). Used by Fastlane for secure authentication with Apple APIs.                    |
| `IOS_APP_STORE_CONNECT_API_KEY_ID`     | GitHub Secret | App Store Connect API Key ID. Used by Fastlane to authenticate securely with App Store Connect.                                                       |
| `IOS_APP_STORE_CONNECT_API_KEY_ISSUER_ID` | GitHub Secret | App Store Connect API Issuer ID. Used in conjunction with API Key ID and Base64 key to authenticate.                                                  |
| `IOS_APP_STORE_TEAM_ID`                | GitHub Secret | Your App Store Connect Team ID (can be found in App Store Connect or developer.apple.com). Required for uploading builds and managing certificates. |
| `IOS_DEV_EMAIL`                        | GitHub Secret | Apple Developer account email used for authentication or account identification in Fastlane.                                                          |
| `IOS_KEYCHAIN_PASSWORD`                | GitHub Secret | Password for the temporary macOS CI keychain used to store signing certificates during iOS builds.                                                    |
| `IOS_MATCH_DEPLOY_KEY`                 | GitHub Secret | SSH private key with read access to your Match certificate repository. Used to fetch provisioning profiles during CI.                                 |
| `IOS_MATCH_PASSWORD`                   | GitHub Secret | Password for the Match encryption repo (used by Fastlane Match to decrypt signing certificates and provisioning profiles).                            |
| `IOS_MATCH_REPOSITORY_URL`             | GitHub Secret | The Git URL of the private repository used by Fastlane Match to store signing certificates and provisioning profiles.                                 |

These variables are decoded and written to disk during the CI process so tools like Fastlane or the Google Play API can use them.

---

## 🚀 CI Workflow Summary

### 1. 🔄 PR Build & Deploy to Google Play Internal Testing

**Why?**  
To enable quick testing and feedback for each PR by distributing `.aab` builds to testers on the **Google Play Console Internal Testing track**.

**How?**
- Triggered on PR open, reopen, or update (`pull_request` events)
- Uses Fastlane’s `pr_deploy` lane to:
  - Build the `.aab` with Gradle (`bundleRelease`)
  - Upload the `.aab` to **Google Play Console Internal Testing track** via Google Play API
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

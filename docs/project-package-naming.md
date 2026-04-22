# Project Package Naming & Flavoring

This doc covers how package names and flavors are set for both Android and iOS, allowing preview and production builds to coexist on the same device.

## Android Flavoring & Distribution

We ship two Android product flavors so preview builds can coexist with production installs on the same device:

- **production**: base `applicationId`
- **preview**: adds `applicationIdSuffix ".preview"`

Defined in [`android/app/build.gradle`](../android/app/build.gradle) with source under [`android/app/src`](../android/app/src/). Example: production -> `com.company.app`; preview -> `com.company.app.preview`.

## Required GitHub Secrets (Android)

| Secret                            | Purpose                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------- |
| `ANDROID_APP_IDENTIFIER`          | Production package name used by Fastlane/Play uploads (e.g., `com.company.app`). |
| `ANDROID_FIREBASE_APP_ID`         | Firebase App Distribution app ID for preview builds.                             |
| `ANDROID_FIREBASE_APP_PACKAGE`    | Preview package name for Firebase (e.g., `com.company.app.preview`).             |
| `ANDROID_FIREBASE_PROJECT_NUMBER` | Firebase project number for preview builds.                                      |
| `ANDROID_FIREBASE_PROJECT_ID`     | Firebase project ID for preview builds.                                          |

## Firebase & Play Console Notes

- Firebase App Distribution should point to the preview package (`<base>.preview`) so preview builds install separately.
- Google Play Console uses the production package (`<base>`, e.g., `com.company.app`); no extra QA package is needed.

## iOS Flavoring & Distribution

iOS preview builds use a separate bundle identifier so they can coexist with production installs on the same device, mirroring the Android `.preview` suffix pattern.

- **Production** builds use `IOS_APP_IDENTIFIER` (e.g., `com.company.app`)
- **Preview** builds (PR deploys, permanent preview) use `IOS_PREVIEW_APP_IDENTIFIER` (e.g., `com.company.app.preview`)

The bundle identifier is injected at build time via Xcode's `PRODUCT_BUNDLE_IDENTIFIER` xcarg — no separate Xcode target or scheme is required. The `match` provisioning profile is fetched for whichever identifier is active, keeping signing transparent across both flows.

### One-Time Setup (per project)

Before the CI pipeline can build with the preview bundle ID, a project owner must complete these steps once:

1. Register `com.yourcompany.app.preview` as a new App ID in the Apple Developer Portal.
2. Create the app in App Store Connect under the preview bundle ID (required for TestFlight uploads).
3. Run the following to generate and store the provisioning profile in your Match repo:
   ```sh
   IOS_APP_IDENTIFIER=com.yourcompany.app.preview bundle exec fastlane match appstore
   ```
4. Add the `IOS_PREVIEW_APP_IDENTIFIER` GitHub secret (e.g., `com.yourcompany.app.preview`).

## Required GitHub Secrets (iOS)

| Secret                                  | Purpose                                                                                  |
| --------------------------------------- | ---------------------------------------------------------------------------------------- |
| `IOS_APP_IDENTIFIER`                    | Production bundle ID used for App Store builds (e.g., `com.company.app`).               |
| `IOS_PREVIEW_APP_IDENTIFIER`            | Preview bundle ID used for TestFlight PR and permanent preview builds (e.g., `com.company.app.preview`). |
| `IOS_APPLE_ID`                          | Numeric Apple App ID (from App Store Connect).                                           |
| `IOS_APP_STORE_TEAM_ID`                 | Apple Developer team ID.                                                                 |
| `IOS_APP_STORE_CONNECT_API_KEY_ID`      | App Store Connect API key ID.                                                            |
| `IOS_APP_STORE_CONNECT_API_KEY_ISSUER_ID` | App Store Connect API key issuer ID.                                                   |
| `IOS_APP_STORE_CONNECT_API_KEY_B64`     | App Store Connect API key content (base64-encoded).                                      |
| `IOS_MATCH_PASSWORD`                    | Encryption password for the Match certificate repository.                                |
| `IOS_MATCH_REPOSITORY_URL`              | SSH URL of the Match certificate repository.                                             |
| `IOS_MATCH_DEPLOY_KEY`                  | SSH private key with read access to the Match repository.                                |
| `IOS_KEYCHAIN_PASSWORD`                 | Password for the temporary CI keychain created by Fastlane.                              |
| `IOS_DEV_EMAIL`                         | Apple developer email used as `FASTLANE_USER`.                                           |

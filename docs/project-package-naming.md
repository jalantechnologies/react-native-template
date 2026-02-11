# Project Package Naming & Flavoring

This doc covers how package names and flavors are set. Android flavoring is configured; iOS flavoring / variable package naming is not yet documented — track progress here: [Issue #312](https://github.com/jalantechnologies/react-native-template/issues/312).

## Android Flavoring & Distribution

We ship two Android product flavors so preview builds can coexist with production installs on the same device:
- **production**: base `applicationId`
- **preview**: adds `applicationIdSuffix ".preview"`

Defined in [`android/app/build.gradle`](../android/app/build.gradle) with source under [`android/app/src`](../android/app/src/). Example: production -> `com.company.app`; preview -> `com.company.app.preview`.

## Required GitHub Secrets (Android)

| Secret | Purpose |
|--------|---------|
| `ANDROID_APP_IDENTIFIER` | Production package name used by Fastlane/Play uploads (e.g., `com.company.app`). |
| `ANDROID_FIREBASE_APP_ID` | Firebase App Distribution app ID for preview builds. |
| `ANDROID_FIREBASE_APP_PACKAGE` | Preview package name for Firebase (e.g., `com.company.app.preview`). |
| `ANDROID_FIREBASE_PROJECT_NUMBER` | Firebase project number for preview builds. |
| `ANDROID_FIREBASE_PROJECT_ID` | Firebase project ID for preview builds. |

## Firebase & Play Console Notes

- Firebase App Distribution should point to the preview package (`<base>.preview`) so preview builds install separately.
- Google Play Console uses the production package (`<base>`); no extra QA package is needed.

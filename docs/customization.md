# Customizing the Template

After forking, the project must be renamed from `Boilerplate` to your app name and its package identifier updated throughout.

## Recommended: AI-Assisted Rename

The fastest and most reliable path is to use Claude Code. A ready-made prompt is provided that instructs Claude to make every change in one session.

1. Fork the repository and open a Claude Code session at the project root.
2. Open [`docs/ai-setup-prompt.md`](./ai-setup-prompt.md).
3. Fill in your `APP_NAME` and `BUNDLE_ID` values in the prompt block.
4. Paste the entire prompt into Claude Code and let it make all changes.
5. When Claude confirms, run `yarn pod-install` to reinstall iOS pods.

## What Gets Changed

The prompt covers every location where `Boilerplate` / `com.bettrsw.boilerplate.app` appears:

| Area | Files |
|---|---|
| Android build | `android/settings.gradle`, `android/app/build.gradle` |
| Android sources | `MainActivity.kt`, `MainApplication.kt`, `SplashActivity.kt`, `ReactNativeFlipper.java` — package declarations + directory rename |
| Android resources | `android/app/src/main/res/values/strings.xml` |
| Android CI | `android/fastlane/Appfile` |
| iOS sources | `AppDelegate.mm`, `Info.plist`, `LaunchScreen.storyboard`, `BoilerplateTests.m` |
| iOS project | `project.pbxproj`, `Podfile`, `*.xcscheme`, `contents.xcworkspacedata` |
| iOS directories | `Boilerplate/`, `BoilerplateTests/`, `Boilerplate.xcodeproj/`, `Boilerplate.xcworkspace/` |
| Root | `app.json`, `package.json`, `sonar-project.properties` |

## Manual Reference

If you need to update only specific parts, these are the exact locations:

### Android

- `android/settings.gradle` — `rootProject.name`
- `android/app/build.gradle` — `namespace` and `applicationId`
- `android/app/src/main/res/values/strings.xml` — `app_name`
- All `.kt` / `.java` files under `android/app/src/*/java/com/boilerplate/` — package declaration
- `MainActivity.kt` — `getMainComponentName()` return value
- Rename `android/app/src/*/java/com/boilerplate/` directories to your app name (lowercase)
- `android/fastlane/Appfile` — fallback `package_name`

### iOS

- `ios/Boilerplate/AppDelegate.mm` — `self.moduleName`
- `ios/Boilerplate/Info.plist` — `CFBundleDisplayName`
- `ios/Boilerplate/LaunchScreen.storyboard` — title label `text`
- `ios/BoilerplateTests/BoilerplateTests.m` — `@interface` and `@implementation` class name
- `ios/Podfile` — `target` names
- `ios/Boilerplate.xcodeproj/project.pbxproj` — global replace `Boilerplate` → new name
- `ios/Boilerplate.xcodeproj/xcshareddata/xcschemes/Boilerplate.xcscheme` — content + filename
- `ios/Boilerplate.xcworkspace/contents.xcworkspacedata` — `FileRef` location
- Rename `ios/Boilerplate*/` directories and `ios/Boilerplate*.xcodeproj/` / `ios/Boilerplate*.xcworkspace/`
- Delete `ios/Podfile.lock` and run `yarn pod-install`

### Root

- `app.json` — `name` and `displayName`
- `package.json` — `name`
- `sonar-project.properties` — `sonar.projectKey`

## CI/CD Metadata

Update any hardcoded project identifiers in:
- [`.github/workflows/*.yml`](../.github/workflows) — app identifiers, project keys
- Environment secrets in Doppler — `IOS_APP_IDENTIFIER`, `ANDROID_APP_IDENTIFIER`, bundle signing details

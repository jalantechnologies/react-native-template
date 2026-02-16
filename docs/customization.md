# Customizing the Template

Use these steps to rebrand the template for your product.

## App Name

1. Update [`app.json`](../app.json) `name` and `displayName`.
2. Update [`package.json`](../package.json) `name`.

## Android

- [`android/settings.gradle`](../android/settings.gradle): set `rootProject.name`.
- [`android/app/build.gradle`](../android/app/build.gradle): update `namespace` and `applicationId`.
- Keep `production` as the base package; `preview` flavor uses `applicationIdSuffix ".preview"` so installs remain side by side.
- Rename package directories under [`android/app/src/*/java/com/boilerplate/`](../android/app/src).
- Update package declarations in Java/Kotlin files.
- [`android/app/src/main/res/values/strings.xml`](../android/app/src/main/res/values/strings.xml): adjust `app_name`.

## iOS

- Rename [`ios/Boilerplate`](../ios/Boilerplate) folder to your app name.
- Update targets in [`ios/Podfile`](../ios/Podfile).
- Update `CFBundleDisplayName` in [`ios/Boilerplate/Info.plist`](../ios/Boilerplate/Info.plist).
- Run `yarn pod-install` after changes.

## CI/CD Metadata

- [`.github/workflows/*.yml`](../.github/workflows): update any hardcoded project identifiers.
- [`sonar-project.properties`](../sonar-project.properties): set the correct `sonar.projectKey`.

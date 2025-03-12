fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android fetch_and_increment_build_number

```sh
[bundle exec] fastlane android fetch_and_increment_build_number
```

Fetches the latest version code from the Play Console and increments it by 1

### android sync_versions

```sh
[bundle exec] fastlane android sync_versions
```

Sync version from package.json to Android and iOS

### android deploy_android_production

```sh
[bundle exec] fastlane android deploy_android_production
```

Deploy a new version to the Google Play

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).

# Setup

This guide covers the tools you need and the commands to get the app running locally.

## Prerequisites

This project uses [asdf](https://asdf-vm.com/) to pin toolchain versions defined in `.tool-versions`.

| Tool | Version | Installation |
|------|---------|--------------|
| Node.js | 22.13.1 | `asdf plugin add nodejs && asdf install nodejs` |
| Yarn | 3.6.4 | `corepack enable && yarn -v` (reads version from `package.json`) |
| Watchman | Latest | `brew install watchman` |
| JDK | 17 | `brew install openjdk@17` |
| Ruby | 3.2.3 | `asdf plugin add ruby && asdf install ruby` |

### iOS Only
- Xcode 26.x (stable):
  ```sh
  brew install xcodesorg/made/xcodes
  xcodes install 26.2
  xcodes select 26.2
  ```
- CocoaPods: `gem install cocoapods`

### Android Only
- [Android Studio](https://developer.android.com/studio) with SDK & Emulator
- Add to `~/.zshrc` (or shell rc):
  ```sh
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
  export JAVA_HOME=$(/usr/libexec/java_home -v 17)
  ```

## Quick Start

```sh
# Install JS dependencies
yarn install

# iOS: install Ruby gems and pods
bundle install
yarn pod-install

# Start Metro bundler (separate terminal)
yarn start

# Run the app
yarn ios      # iOS simulator
yarn android  # Android emulator
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Start Metro bundler |
| `yarn ios` | Run on iOS simulator |
| `yarn android` | Run on Android emulator |
| `yarn lint` | Run ESLint |
| `yarn type-check` | Run TypeScript compiler |
| `yarn test` | Run Jest tests |
| `yarn test:report` | Run tests with coverage |
| `yarn pod-install` | Install iOS CocoaPods |


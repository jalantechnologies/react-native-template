# Setup

This guide is written for a brand-new machine so a new engineer can get the app running in minutes.

## 1) Clone the repo

```sh
git clone git@github.com:jalantechnologies/react-native-template.git
cd react-native-template
```

## 2) Install tooling (in this order)

This project uses [asdf](https://asdf-vm.com/) to pin toolchain versions defined in [`.tool-versions`](../.tool-versions) (CI also reads [`.nvmrc`](../.nvmrc) for Node).

1. Install **asdf**
   - macOS: `brew install asdf && echo '\n. /opt/homebrew/opt/asdf/libexec/asdf.sh' >> ~/.zshrc && source ~/.zshrc`
   - Linux (Debian/Ubuntu): `git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0 && echo '. "$HOME/.asdf/asdf.sh"' >> ~/.bashrc && source ~/.bashrc`
   - Windows: install via [asdf-win](https://github.com/asdf-vm/asdf-windows) or skip asdf and install Node/Ruby directly.
2. **Node.js** 22.13.1: `asdf plugin add nodejs && asdf install nodejs` (reads version from [`.tool-versions`](../.tool-versions))
3. **Yarn** 3.6.4 (installs `yarn` command): `corepack enable && corepack prepare yarn@3.6.4 --activate && yarn -v` (uses version from [`package.json`](../package.json))
4. **Ruby** 3.2.3 + Bundler (installs `bundle` command): `asdf plugin add ruby && asdf install ruby && gem install bundler && bundle -v`
5. **Watchman** (file watcher)
   - macOS: `brew install watchman`
   - Linux: optional; Metro runs without it but you can build from source or skip.
   - Windows: skip (Metro handles watching differently).
6. **JDK** 17
   - macOS: `brew install openjdk@17`
   - Linux: `sudo apt-get install openjdk-17-jdk`
   - Windows: install Temurin 17 or Oracle JDK 17 and set `JAVA_HOME`.
7. **iOS** (macOS only): Xcode 26.x (stable). Install via App Store/Developer portal, or `brew install xcodesorg/made/xcodes && xcodes install 26.2 && xcodes select 26.2`. Install CocoaPods: `gem install cocoapods`.
8. **Android**: Install [Android Studio](https://developer.android.com/studio) (SDK + Emulator). Add to your shell rc:
   - macOS:
     ```sh
     export ANDROID_HOME=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
     export JAVA_HOME=$(/usr/libexec/java_home -v 17)
     ```
   - Linux:
     ```sh
     export ANDROID_HOME=$HOME/Android/Sdk
     export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
     export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
     ```
   - Windows (PowerShell):
     ```powershell
     $env:ANDROID_HOME="$HOME\\AppData\\Local\\Android\\Sdk"
     $env:Path += ";$env:ANDROID_HOME\\emulator;$env:ANDROID_HOME\\platform-tools"
     ```
     iOS build is not supported on Linux/Windows; use Android there.

## 3) Install project dependencies

```sh
yarn install
bundle install         # installs Ruby gems; requires Bundler
```

## 4) Configure environment

Create `.env` at repo root (see [`docs/environment.md`](./environment.md) for all keys):

```sh
cat > .env <<'EOF'
ENVIRONMENT=development
API_BASE_URL=https://your-api.com/api
DD_APPLICATION_ID=your-datadog-app-id
DD_CLIENT_TOKEN=your-datadog-client-token
DD_SITE=US5
LOGGER=console
EOF
```

## 5) Platform setup notes

- **iOS**: macOS only. Run `yarn pod-install` (requires Xcode + CocoaPods) before `yarn ios`.
- **Android**: macOS/Linux/Windows. Ensure an emulator or device is available; `yarn android` will fail if none is running.

## 6) Run and verify

Start Metro (new terminal):

```sh
yarn start
```

In another terminal, run one of:

```sh
yarn ios      # macOS only: expect the iOS simulator to launch the app
yarn android  # all platforms: expect the Android emulator to launch the app
```

You should see Metro logging requests and the app rendering without red screens.

## Emulators & local device setup

### Android

- Easiest: open Android Studio → **AVD Manager** → create a Pixel device with a Google APIs system image.
- CLI (after installing commandline-tools):
  ```sh
  avdmanager create avd -n myEmu -k "system-images;android-35;google_apis;x86_64" --device "pixel_8"  # Intel/Windows/Linux
  avdmanager create avd -n myEmu -k "system-images;android-35;google_apis;arm64-v8a" --device "pixel_8"  # Apple Silicon
  emulator -avd myEmu
  ```
- Start the emulator before running `yarn android`; otherwise React Native cannot auto-launch one.

### iOS (macOS only)

- Launch Simulator: `open -a Simulator` or let `yarn ios` start it.
- List devices: `xcrun simctl list devices`.
- Target a specific simulator: `yarn ios -- --simulator="iPhone 14"` (use any name from the list).

### Local release builds (optional)

- Android APK/AAB: `cd android && ./gradlew assemblePreviewRelease` (or `assembleProductionRelease`). Requires JDK 17 and an emulator/device is **not** needed.
- iOS (macOS): `cd ios && bundle exec fastlane production_deploy` uses the existing Fastlane lane; requires signing assets and Xcode.

## Available Scripts

| Command            | Description             |
| ------------------ | ----------------------- |
| `yarn start`       | Start Metro bundler     |
| `yarn ios`         | Run on iOS simulator    |
| `yarn android`     | Run on Android emulator |
| `yarn lint`        | Run ESLint              |
| `yarn type-check`  | Run TypeScript compiler |
| `yarn test`        | Run Jest tests          |
| `yarn test:report` | Run tests with coverage |
| `yarn pod-install` | Install iOS CocoaPods   |

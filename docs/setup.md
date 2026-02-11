# Setup

This guide is written for a brand-new machine so a new engineer can get the app running in minutes.

## 0) Clone the repo

```sh
git clone git@github.com:jalantechnologies/react-native-template.git
cd react-native-template
```

## 1) Install tooling (in this order)

This project uses [asdf](https://asdf-vm.com/) to pin toolchain versions defined in [`.tool-versions`](../.tool-versions) (CI also reads [`.nvmrc`](../.nvmrc) for Node).

1. Install **asdf** (macOS): `brew install asdf` then `echo '\n. /opt/homebrew/opt/asdf/libexec/asdf.sh' >> ~/.zshrc && source ~/.zshrc`
2. **Node.js** 22.13.1: `asdf plugin add nodejs && asdf install nodejs` (reads version from [`.tool-versions`](../.tool-versions))
3. **Yarn** 3.6.4: `corepack enable && yarn -v` (uses version from [`package.json`](../package.json))
4. **Ruby** 3.2.3: `asdf plugin add ruby && asdf install ruby && gem install bundler`
5. **Watchman** (macOS): `brew install watchman`
6. **JDK** 17: `brew install openjdk@17`
7. **iOS**: Xcode 26.x (stable). You can install via App Store/Developer portal, or via `brew install xcodesorg/made/xcodes && xcodes install 26.2 && xcodes select 26.2`. Install CocoaPods: `gem install cocoapods`.
8. **Android**: Install [Android Studio](https://developer.android.com/studio) (SDK + Emulator). Add to your shell rc:
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
   export JAVA_HOME=$(/usr/libexec/java_home -v 17)
   ```

## 2) Install project dependencies

```sh
yarn install
bundle install         # installs Ruby gems; requires Bundler
```

## 3) Configure environment

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

## 4) iOS setup

```sh
yarn pod-install
```

## 5) Run and verify

Start Metro (new terminal):
```sh
yarn start
```

In another terminal, run one of:
```sh
yarn ios      # expect the iOS simulator to launch the app
yarn android  # expect the Android emulator to launch the app
```

You should see Metro logging requests and the app rendering without red screens.

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

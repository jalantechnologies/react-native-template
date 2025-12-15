# React Native Template

A production-ready React Native boilerplate with TypeScript, navigation, state management, monitoring, and CI/CD pipelines.

## Prerequisites

| Tool | Version | Installation |
|------|---------|--------------|
| Node.js | 22.13.1 | `brew install node@22` or use [nvm](https://github.com/nvm-sh/nvm) |
| Yarn | 1.22.22 | `corepack enable && yarn -v` |
| Watchman | Latest | `brew install watchman` |
| JDK | 17 | `brew install openjdk@17` |
| Ruby | 3.2.3 | `brew install rbenv ruby-build && rbenv install 3.2.3` |

### iOS Only
- Xcode 16.x (stable release, not beta):
  ```sh
  brew install xcodesorg/made/xcodes
  xcodes install 16.2
  xcodes select 16.2
  ```
- CocoaPods: `gem install cocoapods`

### Android Only
- [Android Studio](https://developer.android.com/studio) with SDK & Emulator
- Environment variables in `~/.zshrc`:
  ```sh
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools
  export JAVA_HOME=$(/usr/libexec/java_home -v 17)
  ```

## Quick Start

```sh
# Install dependencies
yarn install

# iOS: Install pods
yarn pod-install

# Start Metro bundler (in a separate terminal)
yarn start

# Run on device/simulator
yarn ios      # iOS
yarn android  # Android
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # App screens (auth, dashboard, profile)
├── navigators/     # React Navigation setup
├── services/       # API client, auth, Datadog
├── contexts/       # React Context providers (auth, account, task)
├── types/          # TypeScript definitions
├── constants/      # App constants
├── utils/          # Hooks and utilities
├── translations/   # i18n resources
├── logger/         # Logging (console, Datadog)
├── config.ts       # Environment config wrapper
└── app.tsx         # App entry point
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

## Environment Configuration

Create a `.env` file in the project root:

```env
ENVIRONMENT=development
API_BASE_URL=https://your-api.com/api
DD_APPLICATION_ID=your-datadog-app-id
DD_CLIENT_TOKEN=your-datadog-client-token
DD_SITE=US5
LOGGER=console
```

Set `LOGGER=datadog` or `LOGGER=console,datadog` to enable Datadog logging.

## Customizing for Your Project

1. **Update app name:**
   - `app.json`: Change `name` and `displayName`
   - `package.json`: Change `name`

2. **Android:**
   - `android/settings.gradle`: Update `rootProject.name`
   - `android/app/build.gradle`: Update `namespace` and `applicationId`
   - Rename package directories under `android/app/src/*/java/com/boilerplate/`
   - Update package declarations in Java/Kotlin files
   - `android/app/src/main/res/values/strings.xml`: Update `app_name`

3. **iOS:**
   - Rename `ios/Boilerplate` folder to your app name
   - Update `ios/Podfile` targets
   - Update `CFBundleDisplayName` in `ios/Boilerplate/Info.plist`
   - Run `yarn pod-install`

4. **CI/CD:**
   - `.github/workflows/*.yml`: Update project references
   - `sonar-project.properties`: Update `sonar.projectKey`

## Key Libraries

| Library | Purpose |
|---------|---------|
| React Navigation | Screen navigation |
| NativeBase | UI components |
| Formik + Yup | Form handling & validation |
| Axios | HTTP client |
| React Native MMKV | Local storage |
| Datadog RUM | Monitoring & analytics |
| i18next | Internationalization |
| React Native Reanimated | Animations |

## CI/CD Pipelines

### Pull Requests
- **Lint Check**: ESLint validation
- **SonarQube**: Code quality analysis
- **Version Check**: Ensures PR version > main version
- **Release Notes**: Validates `docs/release_notes/{version}.md` exists

### Preview Deployment (on PR)
- Android: Firebase App Distribution
- iOS: TestFlight

### Production Deployment (on merge to main)
- Android: Google Play Store
- iOS: App Store

## Release Process

1. Update version in `package.json`
2. Create `docs/release_notes/{version}.md` (max 500 chars)
3. Open PR to `main`
4. After merge, production deployment triggers automatically

## Troubleshooting

### Android Emulator Warning on macOS
If you see "can't be opened because it is from an unidentified developer":
1. Go to System Settings > Privacy & Security
2. Click "Open Anyway" next to the Android Emulator warning

### Localhost Backend on Android
```sh
adb reverse tcp:3000 tcp:3000
```
Then use `http://localhost:3000` as your API URL.

### Metro Bundler Issues
```sh
yarn start --reset-cache
```

### iOS Build Failures
```sh
cd ios && rm -rf Pods Podfile.lock && bundle exec pod install
```

### Xcode Beta Compatibility
React Native may not work with Xcode beta versions. If builds fail, install a stable release:
```sh
brew install xcodesorg/made/xcodes
xcodes install 16.2
xcodes select 16.2
```

## License

Private - Jalan Technologies

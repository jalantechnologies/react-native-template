# Troubleshooting

## Android Emulator Warning on macOS

If you see "can't be opened because it is from an unidentified developer":

1. Go to System Settings > Privacy & Security
2. Click "Open Anyway" next to the Android Emulator warning

## Localhost Backend on Android

```sh
adb reverse tcp:3000 tcp:3000
```

Then use `http://localhost:3000` as your API URL.

## Metro Bundler Issues

```sh
yarn start --reset-cache
```

## iOS Build Failures

```sh
cd ios && rm -rf Pods Podfile.lock && bundle exec pod install
```

Paths: [`ios/Podfile`](../ios/Podfile), generated `Pods/`, and `Podfile.lock` inside [`ios/`](../ios/).

## Xcode Beta Compatibility

React Native often lags behind Xcode beta releases. If builds fail, install the latest stable Xcode instead:

```sh
brew install xcodesorg/made/xcodes
xcodes install 26.2
xcodes select 26.2
```

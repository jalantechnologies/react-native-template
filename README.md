# Boilerplate React Native

This is a boilerplate repository for React Native projects.

**NOTE:** If you're trying to set up this project on a Windows machine, please read the following:

- This project has a history of not running smoothly on Windows machines.
- You may end up wasting a lot of time.
- It is highly recommended to switch to dual boot (run Linux on a Windows machine) and set up the project in a Linux
  environment instead.

  ## Table of Contents

- [Environment Setup](#environment-setup)
- [Android Setup](#android-setup)
- [iOS Setup](#ios-setup)
- [Setup Datadog](#setup-datadog)
- [Setup Logger](#setup-logger)
- [Deployment for Android app on Production](#setup-deployment-for-android-app-on-production)
- [Running Application](#running-application)

# Environment Setup

When cloning the app and using it for projects, a few things need to be updated as outlined below:

## Setup Environment


- Install Node v22:
    - For macOS: 
    ```sh
  brew install node@22
  ```
    - For Linux:
    ```sh
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
    nvm install 22
    nvm use 22
  ```
    - For Windows:
      - Download and install [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
  - Open a new terminal and run:
    ```sh
    nvm install 22
    nvm use 22
    ```

### Install Watchman
- **macOS (Recommended):**
  ```sh
  brew install watchman
  ```
- **Linux & Windows:** Follow the [official documentation](https://facebook.github.io/watchman/docs/install).

- Download and install JDK 17:
   - **macOS:**
  ```sh
  brew install openjdk@17
  ```
- **Linux:**
  ```sh
  sudo apt install openjdk-17-jdk
  ```
- **Windows:**
  ```sh
  choco install openjdk17
  ```

### Set Up Environment Variables for Java
After installation, configure `JAVA_HOME`:
- **macOS/Linux:** Add this to your `~/.zshrc` or `~/.bashrc`:
  ```sh
  export JAVA_HOME=$(/usr/libexec/java_home -v 17)
  export PATH="$JAVA_HOME/bin:$PATH"
  ```
- **Windows:**
  - Go to **System Properties > Advanced > Environment Variables**
  - Add a new variable: `JAVA_HOME = C:\Program Files\OpenJDK\jdk-17`
  - Add `%JAVA_HOME%\bin` to the `Path` variable.

### Install Yarn

The installation method for Yarn depends on how Node.js is set up on your system. To ensure compatibility, refer to the [official Yarn installation guide](https://yarnpkg.com/getting-started/install).

If you installed Node.js using **NVM** (recommended), you can enable Corepack to use the bundled Yarn:

```sh
corepack enable
yarn -v # Verify installation
```

## Setup Project

- Update `name` and `displayName` in `app.json`.
- Update the name of the app in the `package.json` file.
- Update `sonar.projectKey` in the `sonar-project.properties` file.
- Update the package name of `CatContextProvider` in the `src/components/brand/brand.test.tsx` file.
- Update the image in:
    - `docker-compose.yml`
    - `docker-compose.test.yml`
- Update the project name in:
    - `.github/workflows/preview_on_pr_update.yml`
    - `.github/workflows/production_on_push.yml`
 

# Android Setup

## Prerequisites
- Install [Android Studio](https://developer.android.com/studio)
- Install Android SDK & Emulator:
  - Open **Android Studio > Preferences > Appearance & Behavior > System Settings > Android SDK**
  - Install the latest **SDK tools** and **Emulator**
- Set Up Environment Variables:
  ```sh
  export ANDROID_HOME=$HOME/Library/Android/sdk
  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```

For more details, go to [React Native Environment Setup](https://reactnative.dev/docs/environment-setup?platform=android&os=macos&guide=native).

## Update Android Project

- Go to the `android` folder.
- Update `rootProject.name` in `settings.gradle`.
- Update the `namespace` and `applicationId` in `app/build.gradle`.
- Update the folder/directory names `app/src/debug/java/com/boilerplate`, `app/src/main/java/com/boilerplate`,
  and `app/src/release/java/com/boilerplate` according to your project name.
- Update the package name in `app/src/debug/java/com/boilerplate/ReactNativeFlipper.java`
  and `app/src/release/java/com/boilerplate/ReactNativeFlipper.java`.
- Update the package name and method `getMainComponentName()`
  in `app/src/main/java/com/boilerplate/ReactNativeFlipper.java`.
- Update the package name in `app/src/main/java/com/boilerplate/MainApplication.java`
  and `app/src/main/java/com/boilerplate/SplashActivity.java`.
- Update `app_name` in `app/src/main/res/values/strings.xml`.
- For Android icon updates, use [EasyAppIcon](https://easyappicon.com) or similar websites that create a folder with all
  sizes of the icon, then update the folders in `android/app/src/main/res` accordingly.


# iOS Setup

## Prerequisite

- Install [Xcode](https://developer.apple.com/xcode/)
- Install `ruby`:  
    - For macOS:  
      ```sh
      brew install rbenv ruby-build
      rbenv install 3.2.2
      rbenv global 3.2.2
      ```
    - For Linux:  
      ```sh
      sudo apt install rbenv
      rbenv install 3.2.2
      rbenv global 3.2.2
      ```

- Install CocoaPods:  
    - Run the following commands:  
      ```sh
      sudo gem install activesupport -v 7.1.2
      sudo gem install cocoapods
      ```
      
- Install required pods:
  ```sh
  cd ios && pod install
  ```

For more details, go to [React Native Environment Setup](https://reactnative.dev/docs/environment-setup?platform=ios&os=macos&guide=native).

## Update iOS Project

- Go to the `ios` folder.
- Rename folders `Boilerplate....` according to your project name.
- Delete the `project.pbxproj` file in the `Boilerplate.xcodeproj` folder.
- Delete the `Boilerplate.xcscheme` file in the `Boilerplate.xcodeproj/xcshareddata/xcschemes` folder.
- Update `FileRef location` in `Boilerplate.xcworkspace/contents.xcworkspacedata`
- Update `self.moduleName` in `Boilerplate/AppDelegate.mm`
- Update `CFBundleDisplayName` in `Boilerplate/Info.plist`
- Update `label` in `Boilerplate/LaunchScreen.storyboard`
- Update `interface` and `implementation` in `BoilerplateTests/BoilerplateTests.m`
- Update `target` in `Podfile` (main and Tests)
- Delete `Podfile.lock` file
- Install `pod`.
    - run `pod install` command (in `ios/` folder)


## Setup Datadog

Set up a RUM React Native Monitoring and specify application details in the UI.

- In Datadog, navigate to UX Monitoring > Setup & Configurations > New Application.
- Choose `react-native` as the application type.
- Provide an application name to generate a unique Datadog application ID and client token.
- To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those
  settings.

For more details, go to the [Datadog documentation](https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative/).

## Setup Logger

Currently, there are two logging options: console logger and Datadog logger, with the console logger set as the default.
To use the Datadog logger, adjust the environment variable `LOGGER` to `datadog`. For seamless integration with
Datadog's log manager within GitHub Codespaces, configure the following environment
variables: `DD_CLIENT_TOKEN`, `DD_ENVIRONMENT_NAME`, and `DD_APPLICATION_ID`. You can obtain these credentials from
your Datadog account. To use both the console and Datadog loggers simultaneously, set the `LOGGER` environment variable
to `console,datadog`.


# Setup Deployment for Android App on Production

## Prerequisites

- Setup the app on Google Play Console and complete all the requirements.
- Generate an upload key and keystore using this [guide](https://developer.android.com/studio/publish/app-signing).
- Ensure **at least one version** of the application is **uploaded** on Google Play Console in the Production track.

- Generate a Google Service Account Key and add the Google Service account to Google Play Console using the following steps:
  1. Enable the [Google Play Developer API](https://console.developers.google.com/apis/api/androidpublisher.googleapis.com/?hl=en) by selecting an existing Google Cloud Project that fits your requirement and clicking **ENABLE**.
    - If you don't have an existing project or prefer to have a dedicated one for deployment, create a new one and follow the instructions.
  2. Open [Service Accounts on Google Cloud](https://console.cloud.google.com/iam-admin/serviceaccounts?hl=en) and select the project you'd like to use.
    - Click the **CREATE SERVICE ACCOUNT** button at the top of the **Google Cloud Platform Console** page.
    - Verify that you are on the correct Google Cloud Platform Project by checking the **Google Cloud Project ID** from earlier, visible in the light gray text in the second input, preceding .iam.gserviceaccount.com. Alternatively, you can verify the project name in the navigation bar. If not, open the project picker in the top navigation bar, and select the correct one.
    - Provide a Service account name (e.g., `android-supply`).
    - Copy the generated email address noted below the Service account ID field for later use.
    - Click **DONE** (do not click **CREATE AND CONTINUE** as the optional steps such as granting access are not needed).
    - Click on the **Actions** vertical three-dot icon of the service account you just created.
    - Select **Manage keys** from the menu.
    - Click **ADD KEY → Create New Key**.
    - Ensure **JSON** is selected as the Key type, and click **CREATE**.
    - Save the file on your computer when prompted and remember its location.
  3. Open the [Google Play Console](https://play.google.com/console/?hl=en) and select **Users and Permissions**.
    - Click **Invite new users**.
    - Paste the email address you saved earlier into the email address field.
    - Click on **Account Permissions**.
    - Choose the permissions you'd like this account to have. We recommend **Admin (all permissions)**, but you may want to manually select all checkboxes and leave out some of the **Releases** permissions, such as **Release to production, exclude devices, and use Play App Signing**.
    - Click on **Invite User**.

## Setting Up Github Workflow

1. Go to your GitHub repo **Settings**, then **Secrets and Variables** -> **Actions**.
2. Click on `New Repository Secret` and add the following secrets:
   - **GPLAY_SERVICE_ACCOUNT_KEY_JSON**: 
     - GitHub secrets only accept string values. For certain credentials (e.g., .jks or .json files), convert the file to a base64-encoded string before adding it to GitHub secrets. Use this command to convert and copy the resulting string:
       ```sh
       base64 -i your_google_service_account_key.json | pbcopy
       ```
       Paste the copied string into the value of the repository secret on GitHub.
   - **KEYSTORE_FILE**: The base64-encoded .jks or .keystore file used to sign your Android builds generated earlier. Convert the keystore file into a base64-encoded string with:
     ```sh
     base64 -i your_keystore_file.jks | pbcopy
     ```
     Paste the copied string into the value of this secret.
   - **KEYSTORE_PASSWORD**: The password associated with the keystore file.
   - **KEY_ALIAS**: The key store alias.
   - **KEY_PASSWORD**: The private key password.


# Running Application
```sh
yarn start  # To start the metro bundler, in a dedicated terminal window
yarn android # Run on Android Emulator
yarn ios     # Run on iOS Simulator (macOS only)
```

# Using Localhost Backend on Android
To use the localhost backend endpoint on Android, you need to follow one of these steps:

- Expose your local backend using ngrok or any other similar software.
- Use `adb reverse tcp` to forward the port from your machine to the Android device:
    ```
    adb -s <emulator_device_id> reverse tcp:<localhost_port> tcp:<localhost_port>
    ```
Then, update the `API_BASE_URL` in your `.env` file accordingly.

## Troubleshooting guides

- In MacBook, you'll get a warning prompt similar to this - `XXXXX Can't be opened because it is unidentified developer`, when you try to launch android emulator. 
To fix this, follow these steps:
    ```
    Click on Cancel on the message,
    Now go to Apple Menu: System Preferences... / System Settings...
    Click on Privacy & Security
    Here you should see "Allow apps downloaded from: "Android Emulator" was blocked from use because it is not from an identified developer."
    Click on open Anyways
    You will again see a warning prompt saying "Running "Android Emulator" will harm your computer"
    Click on open
    ```


# 🔧 Firebase Configuration

To ensure Firebase works correctly with your app, follow the steps below to match the app's identifiers with the ones registered in Firebase.

---

## ✅ Android Setup

### 1. Verify Package Name

- Open your `google-services.json` file.
- Locate the `package_name` field:
  ```json
  "package_name": "com.example.yourapp"
  ```
- This should **exactly match** the `applicationId` in your `android/app/build.gradle`:
  ```groovy
  defaultConfig {
      applicationId "com.example.yourapp"
      ...
  }
  ```

### 2. Update Package References in Kotlin Source Files

Ensure your package name is consistent in the following files:
```
android/app/src/main/java/com/yourappname/MainActivity.kt
android/app/src/main/java/com/yourappname/MainApplication.kt
```

Update the `package` declaration at the top of each file if the directory or application ID was changed:
```kotlin
package com.example.yourapp
```

---

## ✅ iOS Setup

### 1. Verify Bundle Identifier

- Open `GoogleService-Info.plist`.
- Look for the following entry:
  ```xml
  <key>BUNDLE_ID</key>
  <string>com.example.yourapp</string>
  ```

### 2. Match with AppDelegate Configuration

- Open `ios/YourProjectName/AppDelegate.h` (or `.swift` if you're using Swift).
- Ensure the `self.moduleName` or relevant entry matches the `BUNDLE_ID`:
  ```objc
  self.moduleName = @"com.example.yourapp";
  ```

---

By keeping your `package_name` (Android) and `BUNDLE_ID` (iOS) consistent across Firebase and your codebase, you ensure smooth integration of Firebase services such as notifications, analytics, and authentication.

⚠️ Note

If the app build identifier changes (e.g., you update the package name or bundle ID), you must create a new application in FCM with the updated identifier (package_name or BUNDLE_ID).


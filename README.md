# Boilerplate React Native

This is a boilerplate repository for React Native projects.

**NOTE:** If you're trying to set up this project on a Windows machine, please read the following:

- This project has a history of not running smoothly on Windows machines.
- You may end up wasting a lot of time.
- It is highly recommended to switch to dual boot (run Linux on a Windows machine) and set up the project in a Linux
  environment instead.

# Setup

When cloning the app and using it for projects, a few things need to be updated as outlined below:

## Setup Environment

- Install Node v22:
    - For macOS: `brew install node@22`
    - For Linux:
        - Download and install Node Version
          Manager: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh`
        - Open a new terminal tab and run: `nvm install 22`
    - For Windows:
        - Download and install Node Version Manager (`nvm-windows`) - `nvm-setup.exe` 
          from https://github.com/coreybutler/nvm-windows/releases/tag/1.2.2
        - Open a new command prompt and run: `nvm install 22`

- Install Watchman: Follow the [official documentation](https://facebook.github.io/watchman/docs/install).

- Download and install JDK 11:
    - For macOS:
        - `brew tap homebrew/cask-versions`
        - `brew install --cask zulu11`
        - `brew info --cask zulu11` - Get the path to where cask was installed to double-click the installer.
    - For Linux:
        - `sudo add-apt-repository ppa:openjdk-r/ppa`
        - `sudo apt-get update`
        - `sudo apt-get install openjdk-11-jdk`
    - For Windows:
        - `choco install -y nodejs-lts microsoft-openjdk11`

**Note:** After you install the JDK, update your `JAVA_HOME` environment variable. If you used the above steps, the JDK
will likely be at `/Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home`. Once confirmed, add the following line
to your `.bashrc` or `.bash_profile` or `.zshrc` (as per your shell):

- `export PATH="/Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home/bin:$PATH"`

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

# Setup Android App

## Prerequisite

- Download Android Studio (Required to set up the Android emulator). You'll also get the Android SDK when you set up
  Android Studio.
- You also need to set up the `ANDROID_HOME` environment variable along with the emulator in your PATH variables.
  Confirm your Android SDK location is `/Library/Android/sdk` and add the following lines to your `.bashrc`
  or `.bash_profile` or `.zshrc` (as per your shell):
    ```sh
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```

For more details, go to [React Native Environment Setup](https://reactnative.dev/docs/environment-setup?platform=android&os=macos&guide=native).

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

# Setup iOS App

## Prerequisite

- Download and install Xcode. Installing Xcode will also install the iOS Simulator and all the necessary tools to build
  your iOS app.
- Install `ruby`:
    - For macOS: `brew install rbenv ruby-build`
    - For Linux: `sudo apt install rbenv`
- Install CocoaPods:
    - Go to the `ios/` folder and run the commands:
        - `sudo gem install activesupport -v 6.1.7.6`
        - `sudo gem install cocoapods`
- Install an iOS Simulator in Xcode, open Xcode > Settings and select the Platforms tab. Select a simulator with the
  corresponding version of iOS you wish to use.

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

# Running the project

Assuming you have all requirements installed, you can run the project by running:

- `yarn start` to start the metro bundler, in a dedicated terminal window
- `yarn ios` or `yarn android` to run the application on any of these platform

# Using Localhost Backend Endpoint on Android

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

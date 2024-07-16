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

- Install Node v16:
    - For macOS: `brew install node16`
    - For Linux:
        - Download and install Node Version
          Manager: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh`
        - Open a new terminal tab and run: `nvm install v16`
    - For Windows:
        - Go to the official [Node.js](https://nodejs.org/download/release/v16.20.2/) website.
        - Click on `node-v16.20.2-win-x64.zip` and let it download.

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
- Update `FileRef location` in `Boilerplate.xcwor

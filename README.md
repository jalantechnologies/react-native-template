# Boilerplate React Native

This is a boilerplate repository for react native projects.

NOTE - If you're trying to setup this project in windows machine, below is for you -
- this project has history of NOT running smoothly on windows machine
- you may end up wasting lot of time
- It's highly recommended to switch to dual boot (run linux in windows machine) and setup project in Linux environment instead.

# Setup
When cloning the app and using for projects, a few things need to be updated as below:
## Setup Environment

- Install Node v16 -
    - For MacOS `brew install node16`
    - For Linux
        - Download and install Node Version Manager - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh `
        - open a new tab and run - `nvm install v16`
    - For windows 
        - Go to the official website of [node.js](https://nodejs.org/download/release/v16.20.2/). 
        - Click on `node-v16.20.2-win-xXX.zip` and let it download 

- Install Watchman - Follow [official documentation](https://facebook.github.io/watchman/docs/install)

- Download (and install) jdk11 
    - For MacOS 
        - `brew tap homebrew/cask-versions`
        - `brew install --cask zulu11`
        - `brew info --cask zulu11`  - Get path to where cask was installed to double-click installer
    - For Linux
        - `sudo add-apt-repository ppa:openjdk-r/ppa`
        - `sudo apt-get update`
        - `sudo apt-get install openjdk-11-jdk`
    - For Windows 
        - `choco install -y nodejs-lts microsoft-openjdk11`
    
Note - After you install the JDK, update your JAVA_HOME environment variable. If you used above steps, JDK will likely be at `/Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home`. Once confirmed, add below line in your `.bashrc` or `.bash_profile` or `.zshrc` (as per your kernel)
- `export PATH="/Library/Java/JavaVirtualMachines/zulu-11.jdk/Contents/Home/bin:$PATH"`

## Setup Project
- update name and displayName in `app.json`
- update the name of the app in `package.json` file
- update `sonar.projectKey` in `sonar-project.properties` file
- update package name of `CatContextProvider` in `src/components/brand/brand.test.tsx` file
- update image in -
    - `docker-compose.yml`
    - `docker-compose.test.yml`
- update project name in -
    - `.github/workflows/preview_on_pr_update.yml`
    - `.github/workflows/production_on_push.yml`

# Setup Android App
## Pre-requisite
- Download Android Studio (Required, to setup Android emulator). You'll also get Android sdk, when you setup Android studio. 
- You would also need to setup ANDROID_HOME environment variable along with emulator, in your PATH variables. Confirm your Android sdk location is `/Library/Android/sdk` and add below line in your `.bashrc` or `.bash_profile` or `.zshrc` (as per your kernel) -
`export ANDROID_HOME=$HOME/Library/Android/sdk`
`export PATH=$PATH:$ANDROID_HOME/emulator`
`export PATH=$PATH:$ANDROID_HOME/platform-tools`

For more details, go to `https://reactnative.dev/docs/environment-setup?platform=android&os=macos&guide=native`


## Setup Datadog
Setup a RUM React Native Monitoring and Specify application details in the UI.
- In Datadog, navigate to UX Monitoring > Setup & Configurations > New Application.
- Choose react-native as the application type.
- Provide an application name to generate a unique Datadog application ID and client token.
- To disable automatic user data collection for either client IP or geolocation data, uncheck the boxes for those settings.

For more details, go to `https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative/`

## Setup logger
At present, there are two logging options: console logger and Datadog logger, with the console logger set as the default. If you wish to utilize the Datadog logger, you'll need to adjust the environment variable `LOGGER` to `datadog`. Additionally, for seamless integration with Datadog's log manager within GitHub codespaces, ensure you configure the following environment variables: `DD_CLIENT_TOKEN`, `DD_ENVIRONMENT_NAME`, and `DD_RUM_APPLICATION_ID`. You can obtain these credentials from your Datadog account. If you desire to employ both the console and Datadog loggers simultaneously, simply set the `LOGGER` environment variable to `console,datadog`.

## Update Andoid project
- Go to `android` folder
- update `rootProject.name` in `settings.gradle`
- update the `namespace` and `applicationId` in `app/build.gradle`
- update folder/directory name `app/src/debug/java/com/boilerplate` according to your project name
- update folder/directory name `app/src/main/java/com/boilerplate` according to your project name
- update folder/directory name `app/src/release/java/com/boilerplate` according to your project name
- update package name in `app/src/debug/java/com/boilerplate/ReactNativeFlipper.java` and `app/src/release/java/com/boilerplate/ReactNativeFlipper.java`
- update package name and method `getMainComponentName()` in `app/src/main/java/com/boilerplate/ReactNativeFlipper.java`
- update package name in `app/src/main/java/com/boilerplate/MainApplication.java` and `app/src/main/java/com/boilerplate/SplashActivity.java`
- update `app_name` in `app/src/main/res/values/strings.xml`
- for android to update the icons you can use `https://easyappicon.com` or similar websites which create a folder with all sizes of the icon, update the folders in `android/app/src/main/res` accordingly.

# Setup iOS App
## Pre-requisite
- Download and install Xcode. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app. 
- install `ruby` 
    - For MacOS - `brew install rbenv ruby-build`
    - For Linux - `sudo apt install rbenv`
- Install cocoapods
    - Go to `ios/` folder and run commands - 
    - `sudo gem install activesupport -v 6.1.7.6`
    - `sudo gem install cocoapods`
- Install an iOS Simulator in Xcode, open Xcode > Settings and select the Platforms tab. Select a simulator with the corresponding version of iOS you wish to use.

For more details, go to `https://reactnative.dev/docs/environment-setup?platform=ios&os=macos&guide=native`

## Update iOS project

- go to `ios` folder
- rename folders `Boilerplate....`, according to your project name
- delete `project.pbxproj` file in `Boilerplate.xcodeproj` folder
- delete `Boilerplate.xcscheme` file in `Boilerplate.xcodeproj/xcshareddata/xcschemes` folder
- update `FileRef location` in `Boilerplate.xcworkspace/contents.xcworkspacedata`
- update `self.moduleName` in `Boilerplate/AppDelegate.mm`
- update `CFBundleDisplayName` in `Boilerplate/Info.plist` 
- update `label` in `Boilerplate/LaunchScreen.storyboard`
- update `interface` and `implementation` in  `BoilerplateTests/BoilerplateTests.m`
- update `target` in `Podfile` (main and Tests)
- delete `Podfile.lock` file
- install `pod`. 
    - run `pod install` command (in `ios/` folder)

# Running the project

Assuming you have all requirements installed, you can run the project by running:

- `yarn start` to start the metro bundler, in a dedicated terminal window
- `yarn ios` or `yarn android` to run the application on any of these platform

## Troubleshooting guides

- In MacBook, you'll get a warning prompt similar to this - `XXXXX Can't be opened because it is unidentified developer`, when you try to launch android emulator. 
To fix this, follow these steps -
```
Click on Cancel on the message,

Now go to Apple Menu: System Preferences... / System Settings...

Click on Privacy & Security

Here you should see "Allow apps downloaded from: "Android Emulator" was blocked from use. because it is not from an identified developer.

Click on open Anyways

You will again see a warning: Just click on Open button
```

- In MacBook, if you get errors while building iOS app, follow these -
```
Go to ios/ folder, try to deintegrate pod and create new again. 

    - sudo gem install cocoapods-deintegrate cocoapods-clean
    - pod deintegrate
    - pod update
```

If you're building in a Windows machine and build fails, ensure these things -
- DO NOT use a folder `C:\` drive or where your windows is installed. Select another drive.
- Open VS Code, command promp etc., as admin
- Check (again) if you're using node v16
- Try this command - `react-native run-android & react-native start --reset-cache` 

Still doesn't work, check any open/closed issues [here](https://github.com/thecodingmachine/react-native-boilerplate/issues)
There's a high chance, you'll get a thread similar to the issue you're facing. 

Still doesn't work and didn't get anything? 
If you've already wasted 4+ hours, STOP here. Install dual boot (run linux in windows machine) and setup in Linux machine instead.


Check this for more details - `https://reactnative.dev/docs/environment-setup`

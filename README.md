# Boilerplate React Native

This is a boilerplate repository for react native projects.

When cloning the app and using for projects, a few things need to be updated as below:
 - update the name of the app in package.json file
 - update name in `android/settings.gradle`
 - update the `namespace` and `applicationId` in `android/app/build.gradle`
 - for android to update the icons you can use `https://easyappicon.com` or similar websites which create a folder with all sizes of the icon, update the folders in `android/app/src/main/res` accordingly.
 - for ios you can refer to `https://developer.apple.com/documentation/xcode/configuring-your-app-icon`

## Requirements

Node 16 or greater is required. Development for iOS requires a Mac and Xcode 10 or up.

You also need to install the dependencies required by React Native:

 - for [Android development](https://reactnative.dev/docs/getting-started.html#installing-dependencies-3)
 - for [iOS development](https://reactnative.dev/docs/getting-started.html#installing-dependencies)

Note: There might be a few problems related to ruby version, you can install `rbenv` to manage ruby versions

## Running the project

Assuming you have all requirements installed, you can run the project by running:

 - `yarn start` to start the metro bundler, in a dedicated terminal window
 - `yarn ios` or `yarn android` to run the application on any of these platform

NOTE: Please install `pod` once for iOS by going into `ios` directory and run `pod install` command.

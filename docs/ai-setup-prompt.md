# Post-Fork Setup — Claude Prompt

After forking this template, open a **Claude Code** session at the project root and paste the contents of the prompt below. Fill in your values for `APP_NAME` and `BUNDLE_ID` before pasting.

> **APP_NAME** — PascalCase, single word, no spaces (e.g. `TrackIt`)
> **BUNDLE_ID** — reverse-domain bundle identifier (e.g. `com.mycompany.trackit`)

---

## Prompt (paste into Claude Code)

```
I've just forked react-native-template. Rename the project from "Boilerplate" to my app.

APP_NAME  = <YOUR_APP_NAME>       e.g. TrackIt
BUNDLE_ID = <YOUR_BUNDLE_ID>      e.g. com.mycompany.trackit
APP_NAME_LOWER = lowercase of APP_NAME  e.g. trackit

Make every change below. Use the Edit tool for file edits and Bash mv for directory renames.
Work through the list in order — edit file contents before renaming directories.

─── ANDROID ────────────────────────────────────────────────────────────────────

1. android/settings.gradle
   Change:  rootProject.name = 'Boilerplate'
   To:      rootProject.name = '<APP_NAME>'

2. android/app/build.gradle
   Change all occurrences of:  com.bettrsw.boilerplate.app
   To:                         <BUNDLE_ID>

3. android/app/src/main/res/values/strings.xml
   Change:  <string name="app_name">Boilerplate</string>
   To:      <string name="app_name"><APP_NAME></string>

4. android/app/src/main/java/com/boilerplate/MainActivity.kt
   Change package:  package com.bettrsw.boilerplate.app
   To:              package <BUNDLE_ID>
   Change:  override fun getMainComponentName(): String = "Boilerplate"
   To:      override fun getMainComponentName(): String = "<APP_NAME>"

5. android/app/src/main/java/com/boilerplate/MainApplication.kt
   Change package:  package com.bettrsw.boilerplate.app
   To:              package <BUNDLE_ID>

6. android/app/src/main/java/com/boilerplate/SplashActivity.kt
   Change package:  package com.bettrsw.boilerplate.app
   To:              package <BUNDLE_ID>

7. android/app/src/debug/java/com/boilerplate/ReactNativeFlipper.java
   Change package:  package com.bettrsw.boilerplate.app;
   To:              package <BUNDLE_ID>;

8. Rename directory:
   android/app/src/main/java/com/boilerplate/
   → android/app/src/main/java/com/<APP_NAME_LOWER>/

9. Rename directory:
   android/app/src/debug/java/com/boilerplate/
   → android/app/src/debug/java/com/<APP_NAME_LOWER>/

10. android/fastlane/Appfile
    Change:  "com.bettrsw.boilerplate.app"
    To:      "<BUNDLE_ID>"

─── iOS ─────────────────────────────────────────────────────────────────────────

Note: edit all file contents before renaming any directories.

11. ios/Boilerplate/AppDelegate.mm
    Change:  self.moduleName = @"Boilerplate";
    To:      self.moduleName = @"<APP_NAME>";

12. ios/Boilerplate/Info.plist
    The key CFBundleDisplayName has value "Boilerplate".
    Change that value to "<APP_NAME>".

13. ios/Boilerplate/LaunchScreen.storyboard
    Change:  text="Boilerplate"
    To:      text="<APP_NAME>"

14. ios/BoilerplateTests/BoilerplateTests.m
    Change all occurrences of "BoilerplateTests" to "<APP_NAME>Tests"
    (covers @interface, @implementation, and @end)

15. ios/Podfile
    Change:  target 'Boilerplate' do
    To:      target '<APP_NAME>' do
    Change:  target 'BoilerplateTests' do
    To:      target '<APP_NAME>Tests' do

16. ios/Boilerplate.xcworkspace/contents.xcworkspacedata
    Change:  group:Boilerplate.xcodeproj
    To:      group:<APP_NAME>.xcodeproj

17. ios/Boilerplate.xcodeproj/project.pbxproj
    Replace every occurrence of "Boilerplate" with "<APP_NAME>".
    (This automatically renames BoilerplateTests → <APP_NAME>Tests throughout.)

18. ios/Boilerplate.xcodeproj/xcshareddata/xcschemes/Boilerplate.xcscheme
    Replace every occurrence of "Boilerplate" with "<APP_NAME>" in the file content.
    Then rename the file itself from Boilerplate.xcscheme to <APP_NAME>.xcscheme.

19. Rename directory:  ios/Boilerplate/         → ios/<APP_NAME>/
20. Rename directory:  ios/BoilerplateTests/     → ios/<APP_NAME>Tests/
21. Rename directory:  ios/Boilerplate.xcodeproj/ → ios/<APP_NAME>.xcodeproj/
22. Rename directory:  ios/Boilerplate.xcworkspace/ → ios/<APP_NAME>.xcworkspace/

23. Delete ios/Podfile.lock  (pods must be reinstalled)

─── ROOT FILES ──────────────────────────────────────────────────────────────────

24. app.json
    Change:  "name": "Boilerplate"        → "name": "<APP_NAME>"
    Change:  "displayName": "Boilerplate" → "displayName": "<APP_NAME>"

25. package.json
    Change:  "name": "react-native-template"  → "name": "<APP_NAME_LOWER>"

26. sonar-project.properties
    Change:  sonar.projectKey=jalantechnologies_react-native-template
    To:      sonar.projectKey=<APP_NAME_LOWER>

─── AFTER ALL CHANGES ───────────────────────────────────────────────────────────

Once every edit is confirmed, tell me so I can run:
  yarn pod-install
to reinstall iOS pods with the new target name.
```

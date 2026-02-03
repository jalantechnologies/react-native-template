// This file intentionally contains no code. 
//
// WHAT: Serves as a "Swift Anchor" for the app target's build system.
//
// WHY: On modern toolchains (Xcode 26+ / iOS 26 SDK), Swift is the default
// for new RN projects and many dependencies. When a target has zero Swift
// sources, Xcode may skip linking Swift standard libraries and omit related
// search paths, causing "library not found" or "undefined symbol" errors and
// missing Swift runtime in archives.
// We have created issue for this:https://github.com/jalantechnologies/react-native-template/issues/318
//
// HOW: Having at least one Swift source activates the Swift toolchain so the
// runtime and search paths are included even if app code is Objective-C/ObjC++.

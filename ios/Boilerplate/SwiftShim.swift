// This file intentionally contains no code. 
//
// WHAT: Serves as a "Swift Anchor" for the app target's build system.
//
// WHY: On modern toolchains (Xcode 26+ / iOS 26 SDK), Swift is the default
// for new RN projects and many dependencies. When a target has zero Swift
// sources, Xcode may skip linking Swift standard libraries and omit related
// search paths, causing "library not found" or "undefined symbol" errors and
// missing Swift runtime in archives.
//
// HOW: Having at least one Swift source activates the Swift toolchain so the
// runtime and search paths are included even if app code is Objective-C/ObjC++.
//
// Reference: Apple dev forum thread on needing a Swift file to trigger Swift
// runtime linkage in mixed-language projects:
// https://developer.apple.com/forums/thread/128165

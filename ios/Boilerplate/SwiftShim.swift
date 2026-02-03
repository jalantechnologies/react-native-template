// This file intentionally contains no code. Its presence ensures the app target has at least one
// Swift source, which forces Xcode to link the Swift runtime and standard libraries when the project
// is otherwise Objective-C/ObjC++. Without a Swift source, modern toolchains (e.g., Xcode 26/Swift 6)
// can omit the Swift runtime, leading to linker/runtime errors.
// Reference: Apple Forums and common RN/iOS guidance on adding a minimal Swift file to pull in the
// Swift runtime when mixing Swift/ObjC. Example: https://developer.apple.com/forums/thread/128165

// Temporary stubs to satisfy Datadog static libraries that reference
// Swift 5.6 compatibility loaders, which are not shipped in Swift 6/Xcode 26.
// Remove once Datadog distributes Swift 6-compatible binaries.

// Provide global symbols that Swift 5.6 force-load pragmas expect. The Swift 6
// toolchain on Xcode 26 no longer ships the SwiftCompatibility56 libraries, so
// satisfying these symbols in the app target avoids linker failures when
// Datadog static libs reference them.
__attribute__((visibility("default"), used)) int __swift_FORCE_LOAD_$_swiftCompatibility56 = 0;
__attribute__((visibility("default"), used)) int __swift_FORCE_LOAD_$_swiftCompatibilityConcurrency = 0;
__attribute__((visibility("default"), used)) int __swift_FORCE_LOAD_$_swiftCompatibilityPacks = 0;

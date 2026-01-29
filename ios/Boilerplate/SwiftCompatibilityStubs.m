// Temporary stubs to satisfy Datadog static libraries that reference
// Swift 5.6 compatibility loaders, which are not shipped in Swift 6/Xcode 26.
// Remove once Datadog distributes Swift 6-compatible binaries.

// Provide linker-visible stubs for Swift 5.6 compatibility force-load symbols.
// Use asm aliases so the exported symbol names exactly match what the linker
// expects, and define them as functions to satisfy any function references.
__attribute__((visibility("default"), used)) void __asm__("__swift_FORCE_LOAD_$_swiftCompatibility56") swiftcompat56(void) {}
__attribute__((visibility("default"), used)) void __asm__("__swift_FORCE_LOAD_$_swiftCompatibilityConcurrency") swiftcompatConcurrency(void) {}
__attribute__((visibility("default"), used)) void __asm__("__swift_FORCE_LOAD_$_swiftCompatibilityPacks") swiftcompatPacks(void) {}

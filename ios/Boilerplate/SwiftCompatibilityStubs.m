// Temporary stubs to satisfy Datadog static libraries that reference
// Swift 5.6 compatibility loaders, which are not shipped in Swift 6/Xcode 26.
// Remove once Datadog distributes Swift 6-compatible binaries.

// Provide linker-visible stubs for Swift 5.6 compatibility force-load symbols.
// Use C aliases so the exported symbol names exactly match what the linker expects.
__attribute__((visibility("default"), used)) void swiftcompat56(void) __asm__("__swift_FORCE_LOAD_$_swiftCompatibility56");
__attribute__((visibility("default"), used)) void swiftcompatConcurrency(void) __asm__("__swift_FORCE_LOAD_$_swiftCompatibilityConcurrency");
__attribute__((visibility("default"), used)) void swiftcompatPacks(void) __asm__("__swift_FORCE_LOAD_$_swiftCompatibilityPacks");

void swiftcompat56(void) {}
void swiftcompatConcurrency(void) {}
void swiftcompatPacks(void) {}

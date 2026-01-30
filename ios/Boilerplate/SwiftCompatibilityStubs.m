// Temporary stubs for Datadog 3.4.0 pods built with Swift 5.x.
// Xcode 26 (Swift 6) no longer ships SwiftCompatibility56 libs; these
// symbols satisfy the force-load references in Datadog static binaries.

__attribute__((visibility("default"), used)) void swiftcompat56(void) __asm__("__swift_FORCE_LOAD_$_swiftCompatibility56");
__attribute__((visibility("default"), used)) void swiftcompatConcurrency(void) __asm__("__swift_FORCE_LOAD_$_swiftCompatibilityConcurrency");
__attribute__((visibility("default"), used)) void swiftcompatPacks(void) __asm__("__swift_FORCE_LOAD_$_swiftCompatibilityPacks");

void swiftcompat56(void) {}
void swiftcompatConcurrency(void) {}
void swiftcompatPacks(void) {}

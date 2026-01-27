// Temporary stubs to satisfy Datadog static libraries that reference
// Swift 5.6 compatibility loaders, which are not shipped in Swift 6/Xcode 26.
// Remove once Datadog distributes Swift 6-compatible binaries.

__attribute__((visibility("default"), used))
void __swift_FORCE_LOAD_$_swiftCompatibility56(void) {}
__attribute__((visibility("default"), used))
void __swift_FORCE_LOAD_$_swiftCompatibilityConcurrency(void) {}
__attribute__((visibility("default"), used))
void __swift_FORCE_LOAD_$_swiftCompatibilityPacks(void) {}

// Some Datadog binaries weak-link additional Swift 5.6 compatibility entry points.
__attribute__((visibility("default"), used))
void swiftCompatibility56Stub(void) {}
__attribute__((visibility("default"), used))
void swiftCompatibilityConcurrencyStub(void) {}
__attribute__((visibility("default"), used))
void swiftCompatibilityPacksStub(void) {}

fix(ios): skip pod install on cache hit and align with local dev workflow

iOS CI workflows now skip pod install entirely when the CocoaPods cache is restored, removing unconditional `pod repo update` and `pod update boost` calls that ran on every build. Pod install now uses `RCT_NEW_ARCH_ENABLED=1` to match the local `yarn pod-install` script, eliminating CI/local dependency drift.

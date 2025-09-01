# React Native
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.react.** { *; }
-keep class com.facebook.soloader.** { *; }

# Keep native libraries JNI methods
-keep class com.facebook.** { *; }
-keepclassmembers class * {
    native <methods>;
}

# Prevent stripping Hermes runtime
-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**

# Keep Flipper only in debug, safe to strip in release
-assumenosideeffects class com.facebook.flipper.** { *; }
-assumenosideeffects class com.facebook.react.flipper.** { *; }

# Workaround for some reflection usage in RN
-keepattributes *Annotation*
-keepclassmembers class ** {
    @com.facebook.react.bridge.ReactMethod <methods>;
}

# Datadog RUM / Logs / Session Replay
-keep class com.datadog.android.** { *; }
-dontwarn com.datadog.android.**
-keep class com.datadog.opentracing.** { *; }
-dontwarn com.datadog.opentracing.**

# Needed for Datadog native bridge
-keep class com.datadog.reactnative.** { *; }
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod <methods>;
}

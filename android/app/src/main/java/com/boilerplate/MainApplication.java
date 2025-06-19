package com.bettrsw.boilerplate;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    
    initializeFirebase();
    
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  private void initializeFirebase() {
    if (FirebaseApp.getApps(this).isEmpty()) {
      try {
        FirebaseOptions.Builder optionsBuilder = new FirebaseOptions.Builder()
            .setProjectId(BuildConfig.FIREBASE_PROJECT_ID)
            .setApplicationId(BuildConfig.FIREBASE_APP_ID)
            .setApiKey(BuildConfig.FIREBASE_API_KEY)
            .setGcmSenderId(BuildConfig.FIREBASE_PROJECT_NUMBER);

        if (!BuildConfig.FIREBASE_STORAGE_BUCKET.isEmpty()) {
          optionsBuilder.setStorageBucket(BuildConfig.FIREBASE_STORAGE_BUCKET);
        }

        if (!BuildConfig.FIREBASE_DATABASE_URL.isEmpty()) {
          optionsBuilder.setDatabaseUrl(BuildConfig.FIREBASE_DATABASE_URL);
        }

        FirebaseOptions options = optionsBuilder.build();
        FirebaseApp.initializeApp(this, options);

        android.util.Log.d("Firebase", "Firebase initialized successfully");
      } catch (Exception e) {
        android.util.Log.e("Firebase", "Failed to initialize Firebase", e);
        e.printStackTrace();
      }
    }
  }
}

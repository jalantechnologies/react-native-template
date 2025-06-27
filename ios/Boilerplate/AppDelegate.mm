#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>

// Firebase imports
#import <Firebase.h>
#import <UserNotifications/UserNotifications.h>

@interface AppDelegate () <UNUserNotificationCenterDelegate>
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Configure Firebase programmatically without GoogleService-Info.plist
  [self configureFirebaseWithEnvironmentVariables];
  
  self.moduleName = @"Boilerplate";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // Call the parent implementation
  BOOL result = [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  // Configure notifications after React Native setup
  [self configureNotifications:application];
  
  return result;
}

- (void)configureFirebaseWithEnvironmentVariables {
  // Create Firebase options programmatically using Info.plist values
  FIROptions *options = [[FIROptions alloc] init];
  
  // Read Firebase configuration from Info.plist (populated via environment variables)
  NSDictionary *infoPlist = [[NSBundle mainBundle] infoDictionary];
  
  NSString *apiKey = [infoPlist objectForKey:@"FIREBASE_API_KEY"];
  NSString *appId = [infoPlist objectForKey:@"FIREBASE_APP_ID"];
  NSString *projectId = [infoPlist objectForKey:@"FIREBASE_PROJECT_ID"];
  NSString *gcmSenderId = [infoPlist objectForKey:@"FIREBASE_PROJECT_NUMBER"];
  NSString *bundleId = [infoPlist objectForKey:@"FIREBASE_BUNDLE_ID"];
  
  // Fallback to hardcoded values if environment variables are not available
  options.APIKey = apiKey ?: @"AIzaSyDn7Pa-H3Yjt6_Aegnkz11MlzGpV69FyV0";
  options.appID = appId ?: @"1:715635897715:ios:d7cc56b8a186b100de0106";
  options.projectID = projectId ?: @"react-native-boilerplate-14974";
  options.GCMSenderID = gcmSenderId ?: @"715635897715";
  options.bundleID = bundleId ?: @"com.bettrsw.boilerplate";
  options.storageBucket = [NSString stringWithFormat:@"%@.appspot.com", options.projectID];
  options.databaseURL = [NSString stringWithFormat:@"https://%@-default-rtdb.firebaseio.com", options.projectID];
  
  // Configure Firebase with custom options
  [FIRApp configureWithOptions:options];
  
  NSLog(@"Firebase configured programmatically for iOS FCM with project: %@", options.projectID);
}

- (void)configureNotifications:(UIApplication *)application {
  // Set the notification delegate
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  
  // Register for remote notifications
  [application registerForRemoteNotifications];
  
  NSLog(@"iOS notification configuration completed");
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Handle deep linking URLs
- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

// Handle universal links
- (BOOL)application:(UIApplication *)application continueUserActivity:(nonnull NSUserActivity *)userActivity
 restorationHandler:(nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
}

#pragma mark - Push Notification Handlers

// Called when APNs has assigned the device a unique token
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  // This method will be called when the app successfully registers for remote notifications
  // The token will be handled by @react-native-firebase/messaging
  NSLog(@"Successfully registered for remote notifications");
}

// Called when APNs failed to register the device for push notifications
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  NSLog(@"Failed to register for remote notifications: %@", error.localizedDescription);
}

#pragma mark - UNUserNotificationCenterDelegate

// Handle notification when app is in foreground
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
  
  // Show notification even when app is in foreground
  UNNotificationPresentationOptions options = UNNotificationPresentationOptionAlert |
                                              UNNotificationPresentationOptionSound |
                                              UNNotificationPresentationOptionBadge;
  
  completionHandler(options);
}

// Handle notification tap
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void(^)(void))completionHandler {
  
  // Handle notification tap
  NSDictionary *userInfo = response.notification.request.content.userInfo;
  NSLog(@"Notification tapped with userInfo: %@", userInfo);
  
  completionHandler();
}

@end

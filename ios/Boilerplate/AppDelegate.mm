#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTLinkingManager.h>

// Only import UserNotifications for push notification delegate
#import <UserNotifications/UserNotifications.h>

@interface AppDelegate () <UNUserNotificationCenterDelegate>
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"Boilerplate";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // Call the parent implementation first
  BOOL result = [super application:application didFinishLaunchingWithOptions:launchOptions];
  
  // Configure notifications AFTER React Native setup
  [self configureNotifications:application];
  
  return result;
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
  // The token will be handled by @react-native-firebase/messaging automatically
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

#import "AppDelegate.h"
#import <Firebase.h>
#import <FirebaseMessaging/FirebaseMessaging.h>
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [FIRApp configure];
    
    [FIRMessaging messaging].delegate = self;
    
    UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
    center.delegate = self;
    
    self.moduleName = @"com.bettrsw.boilerplate";
    self.initialProps = @{};
    
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
    NSLog(@"FCM registration token: %@", fcmToken);
}

/**
 * Registers device token with Firebase for push notifications.
 * Uses sandbox token type for development builds to ensure proper message routing
 * through Apple's development push notification service.
 */
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
#ifdef DEBUG
    [[FIRMessaging messaging] setAPNSToken:deviceToken type:FIRMessagingAPNSTokenTypeSandbox];
#else
    [[FIRMessaging messaging] setAPNSToken:deviceToken type:FIRMessagingAPNSTokenTypeProduction];
#endif
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
    NSLog(@"Failed to register for remote notifications: %@", error);
}

/**
 * Controls notification display when app is in foreground.
 * iOS 14+ uses UNNotificationPresentationOptionBanner for modern banner style,
 * while earlier versions fall back to UNNotificationPresentationOptionAlert for compatibility.
 */
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
    if (@available(iOS 14.0, *)) {
        completionHandler(UNNotificationPresentationOptionSound |
                          UNNotificationPresentationOptionBanner |
                          UNNotificationPresentationOptionBadge);
    } else {
        completionHandler(UNNotificationPresentationOptionSound |
                          UNNotificationPresentationOptionAlert |
                          UNNotificationPresentationOptionBadge);
    }
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
    didReceiveNotificationResponse:(UNNotificationResponse *)response
             withCompletionHandler:(void (^)(void))completionHandler
{
    NSDictionary *userInfo = response.notification.request.content.userInfo;
    NSLog(@"Notification tapped with userInfo: %@", userInfo);
    
    completionHandler();
}

/**
 * Processes remote notifications received while app is backgrounded or inactive.
 * Forwards to Firebase messaging for proper handling of FCM-specific data
 * and analytics tracking.
 */
- (void)application:(UIApplication *)application
    didReceiveRemoteNotification:(NSDictionary *)userInfo
          fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
    NSLog(@"Received remote notification: %@", userInfo);
    [[FIRMessaging messaging] appDidReceiveMessage:userInfo];
    completionHandler(UIBackgroundFetchResultNewData);
}

@end

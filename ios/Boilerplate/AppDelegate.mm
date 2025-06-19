#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <Firebase/Firebase.h>
#import "RNCConfig.h"
#import <UserNotifications/UserNotifications.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [self configureFirebase];
    
    [self configureNotifications:application];
    
    self.moduleName = @"com.bettrsw.boilerplate";
    self.initialProps = @{};

    return [super application:application didFinishLaunchingWithOptions:launchOptions];
}storageBucket

- (void)configureFirebase {
    if ([FIRApp defaultApp] == nil) {
        NSString *projectId = [RNCConfig envFor:@"ANDROID_FIREBASE_PROJECT_ID"];
        NSString *appId = [RNCConfig envFor:@"FIREBASE_APP_ID_IOS"];
        NSString *apiKey = [RNCConfig envFor:@"FIREBASE_API_KEY_IOS"];
        NSString *messagingSenderId = [RNCConfig envFor:@"ANDROID_FIREBASE_PROJECT_NUMBER"];
        
        NSLog(@"Configuring Firebase with Project ID: %@", projectId);
        
        if (projectId && appId && apiKey && messagingSenderId) {
            FIROptions *options = [[FIROptions alloc] initWithGoogleAppID:appId
                                                              GCMSenderID:messagingSenderId];
            options.projectID = projectId;
            options.APIKey = apiKey;
            
            if (projectId && projectId.length > 0) {
                options.storageBucket = [NSString stringWithFormat:@"%@.appspot.com", projectId];
                options.bundleID = [NSString stringWithFormat:@"%@.firebaseapp.com", projectId];
                options.databaseURL = [NSString stringWithFormat:@"https://%@-default-rtdb.firebaseio.com", projectId];
            }
            
            [FIRApp configureWithOptions:options];
            NSLog(@"Firebase configured successfully");
        } else {
            NSLog(@"Firebase configuration failed: Missing required environment variables");
            NSLog(@"Project ID: %@", projectId ?: @"(null)");
            NSLog(@"App ID: %@", appId ?: @"(null)");
            NSLog(@"API Key: %@", apiKey ? @"(present)" : @"(null)");
            NSLog(@"Sender ID: %@", messagingSenderId ?: @"(null)");
        }
    } else {
        NSLog(@"Firebase already configured");
    }
}

- (void)configureNotifications:(UIApplication *)application {
    if (@available(iOS 10.0, *)) {
        UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
        center.delegate = self;
        [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge)
                              completionHandler:^(BOOL granted, NSError * _Nullable error) {
            if (granted) {
                NSLog(@"Notification permission granted");
            } else {
                NSLog(@"Notification permission denied: %@", error.localizedDescription);
            }
        }];
    } else {
        // iOS 9 and below
        UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:
                                                (UIUserNotificationTypeAlert | UIUserNotificationTypeBadge | UIUserNotificationTypeSound)
                                                                                    categories:nil];
        [application registerUserNotificationSettings:settings];
    }
    
    [application registerForRemoteNotifications];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler API_AVAILABLE(ios(10.0)) {
    completionHandler(UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound);
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void(^)(void))completionHandler API_AVAILABLE(ios(10.0)) {
    NSDictionary *userInfo = response.notification.request.content.userInfo;
    
    NSLog(@"Notification tapped with userInfo: %@", userInfo);
    
    completionHandler();
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSLog(@"Successfully registered for remote notifications");
    
    // Convert token to string
    const unsigned *tokenBytes = [deviceToken bytes];
    NSString *hexToken = [NSString stringWithFormat:@"%08x%08x%08x%08x%08x%08x%08x%08x",
                         ntohl(tokenBytes[0]), ntohl(tokenBytes[1]), ntohl(tokenBytes[2]),
                         ntohl(tokenBytes[3]), ntohl(tokenBytes[4]), ntohl(tokenBytes[5]),
                         ntohl(tokenBytes[6]), ntohl(tokenBytes[7])];
    
    NSLog(@"Device token: %@", hexToken);
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    NSLog(@"Failed to register for remote notifications: %@", error.localizedDescription);
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler {
    NSLog(@"Received remote notification: %@", userInfo);
    
    completionHandler(UIBackgroundFetchResultNewData);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
    return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
    return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

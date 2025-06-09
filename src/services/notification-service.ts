// services/notification-service.ts
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  setBackgroundMessageHandler,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class NotificationService {
  private messaging: FirebaseMessagingTypes.Module;
  private PushNotification: any = null;

  constructor() {
    const app = getApp();
    this.messaging = getMessaging(app);
    this.initializePushNotification();
    this.setupBackgroundHandler();
  }

  private async initializePushNotification() {
    try {
      // Dynamically import react-native-push-notification
      this.PushNotification = require('react-native-push-notification').default;

      // Configure the library
      this.PushNotification.configure({
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function (token: any) {
          console.log('TOKEN:', token);
        },

        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification: any) {
          console.log('NOTIFICATION:', notification);

          // Required on iOS only (see fetchCompletionHandler docs: https://reactnative.dev/docs/pushnotificationios)
          notification.finish('UIBackgroundFetchResultNoData');
        },

        // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
        onAction: function (notification: any) {
          console.log('ACTION:', notification.action);
          console.log('NOTIFICATION:', notification);
        },

        // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator.
        onRegistrationError: function (err: any) {
          console.error(err.message, err);
        },

        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,

        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotification.requestPermissions() later
         * - if you are not using remote notification or do not have Firebase installed, use this:
         *     requestPermissions: Platform.OS === 'ios'
         */
        requestPermissions: true,
      });

      // Create a channel for Android
      this.PushNotification.createChannel(
        {
          channelId: 'default-channel', // (required)
          channelName: 'Default Channel', // (required)
          channelDescription: 'A default channel for notifications', // (optional) default: undefined.
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created: boolean) => console.log(`createChannel 'default-channel' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
    } catch (error) {
      console.log('react-native-push-notification not available:', error);
    }
  }

  private setupBackgroundHandler() {
    setBackgroundMessageHandler(this.messaging, async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);

      if (remoteMessage.notification) {
        await this.displayBackgroundNotification(remoteMessage);
      }
    });
  }

  private async displayBackgroundNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    try {
      if (this.PushNotification) {
        // Display native notification using react-native-push-notification
        this.PushNotification.localNotification({
          /* Android Only Properties */
          channelId: 'default-channel', // (required) channelId, if the channel doesn't exist, notification will not trigger.
          ticker: 'My Notification Ticker', // (optional)
          showWhen: true, // (optional) default: true
          autoCancel: true, // (optional) default: true
          largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
          largeIconUrl: '', // (optional) default: undefined
          smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
          bigText: remoteMessage.notification?.body ?? '', // (optional) default: "message" prop
          subText: '', // (optional) default: none
          bigPictureUrl: '', // (optional) default: undefined
          bigLargeIcon: '', // (optional) default: undefined
          bigLargeIconUrl: '', // (optional) default: undefined
          color: 'red', // (optional) default: system default
          vibrate: true, // (optional) default: true
          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
          tag: 'some_tag', // (optional) add tag to message
          group: 'group', // (optional) add group to message
          groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
          ongoing: false, // (optional) set whether this is an "ongoing" notification
          priority: 'high', // (optional) set notification priority, default: high
          visibility: 'private', // (optional) set notification visibility, default: private
          ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
          shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
          onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

          when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
          usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
          timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

          messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

          actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
          invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

          /* iOS only properties */
          category: '', // (optional) default: empty string
          subtitle: '', // (optional) smaller title below notification title

          /* iOS and Android properties */
          id: Date.now(), // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
          title: remoteMessage.notification?.title ?? 'New Message', // (optional)
          message: remoteMessage.notification?.body ?? '', // (required)
          picture: '', // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
          userInfo: remoteMessage.data, // (optional) default: {} (using null throws a JSON value '<null>' error)
          playSound: true, // (optional) default: true
          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
          number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
          repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        });
      } else {
        // Fallback to console logging
        console.log('Background notification (fallback):', {
          title: remoteMessage.notification?.title ?? 'New Message',
          body: remoteMessage.notification?.body ?? '',
          data: remoteMessage.data,
        });
      }
    } catch (error) {
      console.error('Error displaying background notification:', error);
      // Fallback for when notification fails
      console.log('Fallback - Background notification:', remoteMessage.notification);
    }
  }

  // Method to create notification channel (for Android)
  async createNotificationChannel() {
    if (this.PushNotification && Platform.OS === 'android') {
      this.PushNotification.createChannel(
        {
          channelId: 'default-channel',
          channelName: 'Default Channel',
          channelDescription: 'A default channel for notifications',
          playSound: true,
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        (created: boolean) => console.log(`Channel created: ${created}`),
      );
    }
  }

  // Method to handle foreground notifications
  async handleForegroundNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    if (remoteMessage.notification) {
      console.log('Foreground notification:', remoteMessage.notification);

      // Optionally display as local notification even in foreground
      // await this.displayBackgroundNotification(remoteMessage);
    }
  }
}

export default new NotificationService();

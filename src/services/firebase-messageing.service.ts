import notifee from '@notifee/react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

export class FirebaseMessagingService {
  private messaging: any;

  constructor() {
    const app = getApp();
    this.messaging = getMessaging(app);
  }

  readonly requestUserPermission = async (): Promise<void> => {
    try {
      // Request permission using Notifee
      const settings = await notifee.requestPermission();

      if (settings.authorizationStatus >= 1) {
        console.log('Notification permission granted:', settings);
        await this.getFcmToken();
      } else {
        Alert.alert('Push Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  private readonly getFcmToken = async (): Promise<string | null> => {
    try {
      const fcmToken = await getToken(this.messaging);

      if (fcmToken) {
        console.log('Fcm Token', fcmToken);
        return fcmToken;
      } else {
        console.log('Failed to get Fcm token');
        return null;
      }
    } catch (error) {
      console.error('Error fetching FCM token:', error);
      return null;
    }
  };

  readonly setupBackgroundMessageHandler = (
    displayNotification: (title: string, body: string, data?: any) => Promise<void>,
  ): void => {
    setBackgroundMessageHandler(this.messaging, async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);

      if (remoteMessage.notification) {
        await displayNotification(
          remoteMessage.notification.title ?? 'New Message',
          remoteMessage.notification.body ?? '',
          remoteMessage.data,
        );
      }
    });
  };

  readonly setupForegroundMessageHandler = (
    displayNotification: (title: string, body: string, data?: any) => Promise<void>,
  ) => {
    return onMessage(this.messaging, async remoteMessage => {
      console.log('Received foreground message:', remoteMessage);

      if (remoteMessage.notification) {
        // Display notification even in foreground
        await displayNotification(
          remoteMessage.notification.title ?? 'New Notification',
          remoteMessage.notification.body ?? '',
          remoteMessage.data,
        );
      }
    });
  };

  readonly setupNotificationOpenedHandler = (): void => {
    // Handle notification opened from background
    onNotificationOpenedApp(this.messaging, remoteMessage => {
      console.log('Notification opened from background state:', remoteMessage.notification);
      // Handle navigation or other actions when notification is tapped
      // You can emit an event or call a navigation handler here
    });
  };

  readonly setupInitialNotificationHandler = (): void => {
    // Handle app opened from quit state
    getInitialNotification(this.messaging).then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage?.notification,
        );
        // Handle navigation or other actions when app is opened from notification
        // You can emit an event or call a navigation handler here
      }
    });
  };

  readonly initialize = async (
    displayNotification: (title: string, body: string, data?: any) => Promise<void>,
  ) => {
    await this.requestUserPermission();
    this.setupBackgroundMessageHandler(displayNotification);
    this.setupNotificationOpenedHandler();
    this.setupInitialNotificationHandler();

    // Return the unsubscribe function for foreground messages
    return this.setupForegroundMessageHandler(displayNotification);
  };
}

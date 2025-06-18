import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

import Logger from '../logger/logger';

export class FirebaseMessagingService {
  private readonly messaging: any;

  constructor() {
    const app = getApp();
    this.messaging = getMessaging(app);
  }

  readonly requestUserPermission = async (): Promise<void> => {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await this.messaging.requestPermission();
        const enabled = authStatus === 1 || authStatus === 2;

        if (enabled) {
          Logger.info('Notification permission granted');
          await this.getFcmToken();
        } else {
          Alert.alert('Push Notification permission denied');
        }
      } else {
        await this.getFcmToken();
      }
    } catch (error) {
      Logger.error('Error requesting notification permission: ' + error);
    }
  };

  private readonly getFcmToken = async (): Promise<string | null> => {
    try {
      const fcmToken = await getToken(this.messaging);
      if (fcmToken) {
        Logger.info('Fcm Token: ' + fcmToken);
        return fcmToken;
      } else {
        Logger.warn('Failed to get Fcm token');
        return null;
      }
    } catch (error) {
      Logger.error('Error fetching FCM token: ' + error);
      return null;
    }
  };

  readonly setupBackgroundMessageHandler = (
    displayNotification: (title: string, body: string, data?: any) => Promise<void>,
  ): void => {
    setBackgroundMessageHandler(this.messaging, async remoteMessage => {
      Logger.info('Message handled in the background! ' + JSON.stringify(remoteMessage));
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
      Logger.info('Received foreground message: ' + JSON.stringify(remoteMessage));
      if (remoteMessage.notification) {
        await displayNotification(
          remoteMessage.notification.title ?? 'New Notification',
          remoteMessage.notification.body ?? '',
          remoteMessage.data,
        );
      }
    });
  };

  readonly setupNotificationOpenedHandler = (): void => {
    onNotificationOpenedApp(this.messaging, remoteMessage => {
      Logger.info(
        'Notification opened from background state: ' + JSON.stringify(remoteMessage.notification),
      );
    });
  };

  readonly setupInitialNotificationHandler = (): void => {
    getInitialNotification(this.messaging).then(remoteMessage => {
      if (remoteMessage) {
        Logger.info(
          'Notification caused app to open from quit state: ' +
            JSON.stringify(remoteMessage?.notification),
        );
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
    return this.setupForegroundMessageHandler(displayNotification);
  };
}

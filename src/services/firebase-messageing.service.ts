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

/**
 * Manages Firebase Cloud Messaging integration for push notifications.
 *
 * This service handles all aspects of FCM setup:
 * - Permission requests
 * - Token retrieval and management
 * - Background and foreground message handling
 * - Notification tap handling for different app states
 */
export class FirebaseMessagingService {
  private readonly messaging: any;

  constructor() {
    const app = getApp();
    this.messaging = getMessaging(app);
  }

  /**
   * Requests notification permissions from the user.
   *
   * @return A promise that resolves when the permission flow is complete
   */
  readonly requestUserPermission = async (): Promise<void> => {
    try {
      if (Platform.OS === 'ios') {
        const authStatus = await this.messaging.requestPermission();
        const enabled = authStatus === 1 || authStatus === 2; //

        if (enabled) {
          Logger.info('Notification permission granted');
          await this.getFcmToken();
        } else {
          Alert.alert('Push Notification permission denied');
        }
      } else {
        // On Android, permissions are granted at app install time
        await this.getFcmToken();
      }
    } catch (error) {
      Logger.error('Error requesting notification permission: ' + error);
    }
  };

  /**
   * Retrieves FCM token for device registration.
   *
   * The token must be sent to your application server to enable
   * sending targeted messages to this specific device.
   *
   * @return The FCM token string or null if retrieval failed
   */
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

  /**
   * Configures background message handler for notifications received when app is not in foreground.
   *
   * Firebase requires this handler to be registered to receive messages when the app
   * is in background state. We delegate the actual notification display to the
   * provided displayNotification function for consistent notification styling.
   *
   * @param displayNotification Function that creates and displays the notification UI
   */
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

  /**
   * Configures foreground message handler for when the app is open and visible.
   *
   * By default, Firebase doesn't show notifications when app is in foreground,
   * but this handler ensures notifications are still displayed to users
   * even when they're actively using the app.
   *
   * @param displayNotification Function that creates and displays the notification UI
   * @return An unsubscribe function to remove the handler when no longer needed
   */
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

  /**
   * Sets up handler for when user taps a notification while app is in background.
   *
   * This is where you should implement navigation logic to direct users
   * to the appropriate screen based on notification content.
   */
  readonly setupNotificationOpenedHandler = (): void => {
    onNotificationOpenedApp(this.messaging, remoteMessage => {
      Logger.info(
        'Notification opened from background state: ' + JSON.stringify(remoteMessage.notification),
      );
    });
  };

  /**
   * Handles case where app was completely closed and opened via notification.
   *
   * This is crucial for proper deep linking when the app was terminated.
   * Without this handler, tapping notifications when the app is closed
   * would just open the app to its default screen.
   */
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

  /**
   * Initializes all notification handlers and requests permissions.
   *
   * This should be called during app startup, ideally in your root component.
   * The returned unsubscribe function should be called when the component unmounts
   * to prevent memory leaks.
   *
   * @param displayNotification Function that creates and displays notifications
   * @return A function to unsubscribe from foreground notifications
   */
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

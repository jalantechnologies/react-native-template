import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

import Logger from '../logger/logger';

export class NotificationService {
  private isInitialized = false;

  initialize = async (): Promise<void> => {
    if (!this.isInitialized) {
      await this.initializeNotifications();
    }
  };

  private readonly initializeNotifications = async (): Promise<void> => {
    try {
      PushNotification.configure({
        onNotification: this.onNotification,

        onRegister: (token: { os: string; token: string }) => {
          Logger.debug(`Push notification token: ${token.token}`);
        },

        onRegistrationError: (error: Error) => {
          Logger.error(`Registration error: ${error.message}`);
        },

        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },

        popInitialNotification: true,
        requestPermissions: true,
      });

      await this.createNotificationChannels();
      this.isInitialized = true;
    } catch (error) {
      Logger.error(`Failed to initialize notifications: ${error}`);
    }
  };

  private readonly createDefaultChannel = (): Promise<void> => {
    return new Promise<void>(resolve => {
      PushNotification.createChannel(
        {
          channelId: 'default',
          channelName: 'Default Notifications',
          channelDescription: 'General app notifications',
          playSound: true,
          soundName: 'default',
          importance: PushNotification.Importance.DEFAULT,
          vibrate: true,
        },
        (success: boolean) => {
          Logger.debug(`Default channel created: ${success}`);
          resolve();
        },
      );
    });
  };

  private readonly createHighPriorityChannel = (): Promise<void> => {
    return new Promise<void>(resolve => {
      PushNotification.createChannel(
        {
          channelId: 'high-priority',
          channelName: 'High Priority',
          channelDescription: 'Urgent notifications that require immediate attention',
          playSound: true,
          soundName: 'default',
          importance: PushNotification.Importance.HIGH,
          vibrate: true,
        },
        (success: boolean) => {
          Logger.debug(`High priority channel created: ${success}`);
          resolve();
        },
      );
    });
  };

  private readonly createMessagesChannel = (): Promise<void> => {
    return new Promise<void>(resolve => {
      PushNotification.createChannel(
        {
          channelId: 'messages',
          channelName: 'Messages',
          channelDescription: 'Chat and direct message notifications',
          playSound: true,
          soundName: 'default',
          importance: PushNotification.Importance.HIGH,
          vibrate: true,
        },
        (success: boolean) => {
          Logger.debug(`Messages channel created: ${success}`);
          resolve();
        },
      );
    });
  };

  private readonly createNotificationChannels = async (): Promise<void> => {
    if (Platform.OS === 'android') {
      await this.createDefaultChannel();
      await this.createHighPriorityChannel();
      await this.createMessagesChannel();
    }
  };

  private readonly onNotification = (notification: any): void => {
    Logger.debug(`Notification received: ${JSON.stringify(notification)}`);

    if (notification.userInteraction) {
      this.handleNotificationPress(notification);
    }

    if (Platform.OS === 'ios') {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    }
  };

  setupForegroundEventHandlers = () => {
    return () => {};
  };

  readonly handleForegroundNotification = async (remoteMessage: any): Promise<void> => {
    try {
      if (remoteMessage.notification) {
        await this.displayLocalNotification(
          remoteMessage.notification.title ?? 'New Message',
          remoteMessage.notification.body ?? '',
          remoteMessage.data,
        );
      }
    } catch (error) {
      Logger.error(`Error handling foreground notification: ${error}`);
    }
  };

  private readonly handleNotificationPress = async (notification: any): Promise<void> => {
    try {
      const data = Platform.OS === 'android' ? notification.data : notification.userInfo;

      if (data) {
        const type = data.type;

        switch (type) {
          case 'message':
            Logger.debug('Navigating to message screen');
            break;
          case 'task':
            Logger.debug('Navigating to task screen');
            break;
          default:
            Logger.warn(`Unknown notification type: ${type}`);
        }
      }
    } catch (error) {
      Logger.error(`Error handling notification press: ${error}`);
    }
  };

  readonly displayNotification = async (title: string, body: string, data?: any): Promise<void> => {
    await this.displayLocalNotification(title, body, data);
  };

  readonly displayLocalNotification = async (
    title: string,
    body: string,
    data?: any,
    channelId: string = 'default',
  ): Promise<void> => {
    try {
      PushNotification.localNotification({
        channelId,
        title,
        message: body,
        playSound: true,
        soundName: 'default',
        userInfo: data,
        smallIcon: 'ic_notification',
        largeIcon: '',
        vibrate: true,
        vibration: 300,
        priority: 'high',
        alertAction: 'view',
        category: '',
      });
    } catch (error) {
      Logger.error(`Error displaying local notification: ${error}`);
    }
  };

  readonly scheduleNotification = async (
    title: string,
    body: string,
    timestamp: number,
    data?: any,
  ): Promise<void> => {
    try {
      PushNotification.localNotificationSchedule({
        channelId: 'default',
        title,
        message: body,
        date: new Date(timestamp),
        playSound: true,
        soundName: 'default',
        userInfo: data,
        smallIcon: 'ic_notification',
        largeIcon: '',
        vibrate: true,
        vibration: 300,
        priority: 'high',
        alertAction: 'view',
        category: '',
      });
      Logger.debug(`Notification scheduled for timestamp: ${timestamp}`);
    } catch (error) {
      Logger.error(`Error scheduling notification: ${error}`);
    }
  };

  readonly cancelAllNotifications = async (): Promise<void> => {
    try {
      PushNotification.cancelAllLocalNotifications();
      if (Platform.OS === 'ios') {
        PushNotificationIOS.removeAllDeliveredNotifications();
      }
      Logger.debug('All notifications cancelled');
    } catch (error) {
      Logger.error(`Error cancelling all notifications: ${error}`);
    }
  };

  readonly cancelNotification = async (notificationId: string): Promise<void> => {
    try {
      PushNotification.cancelLocalNotification(notificationId);
      Logger.debug(`Notification cancelled: ${notificationId}`);
    } catch (error) {
      Logger.error(`Error cancelling notification ${notificationId}: ${error}`);
    }
  };

  readonly getBadgeCount = async (): Promise<number> => {
    if (Platform.OS === 'ios') {
      try {
        const badgeCount = await new Promise<number>(resolve => {
          PushNotificationIOS.getApplicationIconBadgeNumber(badge => {
            resolve(badge);
          });
        });
        return badgeCount;
      } catch (error) {
        Logger.error(`Error getting badge count: ${error}`);
        return 0;
      }
    }
    return 0;
  };

  readonly setBadgeCount = async (count: number): Promise<void> => {
    try {
      PushNotification.setApplicationIconBadgeNumber(count);
      Logger.debug(`Badge count set to: ${count}`);
    } catch (error) {
      Logger.error(`Error setting badge count: ${error}`);
    }
  };
}

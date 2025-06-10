import notifee, { AndroidImportance, EventType, TriggerType } from '@notifee/react-native';

import Logger from '../logger/logger';
export class NotificationService {
  private isInitialized = false;

  initialize = async (): Promise<void> => {
    if (!this.isInitialized) {
      await this.initializeNotifee();
    }
  };

  private readonly initializeNotifee = async (): Promise<void> => {
    try {
      await this.requestNotificationPermissions();
      await this.createNotificationChannels();
      this.setupBackgroundEventHandlers();
      this.isInitialized = true;
    } catch (error) {
      Logger.error(`Failed to initialize Notifee: ${error}`);
    }
  };

  private readonly requestNotificationPermissions = async (): Promise<void> => {
    await notifee.requestPermission();
  };

  /**
   * Creates Android notification channels with different importance levels.
   * High importance channels bypass Do Not Disturb mode and show heads-up notifications
   * for critical communications like messages and urgent tasks.
   */
  private readonly createNotificationChannels = async (): Promise<void> => {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Notifications',
      description: 'General app notifications',
      importance: AndroidImportance.DEFAULT,
      sound: 'default',
      vibration: true,
    });

    await notifee.createChannel({
      id: 'high-priority',
      name: 'High Priority',
      description: 'Urgent notifications that require immediate attention',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    });

    await notifee.createChannel({
      id: 'messages',
      name: 'Messages',
      description: 'Chat and direct message notifications',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    });
  };

  /**
   * Sets up handlers for notification interactions when app is in background.
   * Background events are processed differently than foreground events due to
   * React Native's execution context limitations in background state.
   */
  private readonly setupBackgroundEventHandlers = (): void => {
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      try {
        const { notification, pressAction } = detail;

        switch (type) {
          case EventType.DISMISSED:
            this.handleNotificationDismissal(notification);
            break;
          case EventType.PRESS:
            await this.handleNotificationPress(notification);
            break;
          case EventType.ACTION_PRESS:
            await this.handleActionPress(pressAction?.id);
            break;
        }
      } catch (error) {
        Logger.error(`Error handling background notification event: ${error}`);
      }
    });
  };

  readonly setupForegroundEventHandlers = () => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          this.handleNotificationDismissal(detail.notification);
          break;
        case EventType.PRESS:
          this.handleForegroundNotificationPress(detail.notification);
          break;
      }
    });
  };

  private readonly handleNotificationDismissal = (notification: any): void => {
    Logger.debug(`Notification dismissed: ${notification?.id}`);
  };

  private readonly handleForegroundNotificationPress = (notification: any): void => {
    if (notification?.data) {
      Logger.debug(`Foreground notification pressed: ${notification.data.type}`);
    }
  };

  /**
   * Displays notifications when app is in foreground.
   * By default, Firebase notifications don't show when app is active,
   * so we manually display them to maintain consistent UX across app states.
   */
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
      if (notification?.data) {
        const { type } = notification.data;

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

  private readonly handleActionPress = async (actionId: string | undefined): Promise<void> => {
    try {
      switch (actionId) {
        case 'reply':
          Logger.debug('Processing reply action');
          break;
        case 'mark-read':
          Logger.debug('Marking notification as read');
          break;
        default:
          Logger.warn(`Unknown action pressed: ${actionId}`);
      }
    } catch (error) {
      Logger.error(`Error handling action press: ${error}`);
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
      await notifee.displayNotification({
        title,
        body,
        data,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          color: '#FF6B35',
          pressAction: {
            id: 'default',
          },
          vibrationPattern: this.getVibrationPattern(),
        },
        ios: {
          sound: 'default',
        },
      });
    } catch (error) {
      Logger.error(`Error displaying local notification: ${error}`);
    }
  };

  /**
   * Returns vibration pattern optimized for user attention without being intrusive.
   * Pattern: [delay, vibrate, pause, vibrate] in milliseconds.
   * Based on Android Material Design guidelines for notification feedback.
   */
  private readonly getVibrationPattern = (): number[] => {
    return [100, 300, 500, 300];
  };

  readonly scheduleNotification = async (
    title: string,
    body: string,
    timestamp: number,
    data?: any,
  ): Promise<void> => {
    try {
      await notifee.createTriggerNotification(
        {
          title,
          body,
          data,
          android: {
            channelId: 'default',
            importance: AndroidImportance.HIGH,
          },
          ios: {
            sound: 'default',
          },
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp,
        },
      );
      Logger.debug(`Notification scheduled for timestamp: ${timestamp}`);
    } catch (error) {
      Logger.error(`Error scheduling notification: ${error}`);
    }
  };

  readonly cancelAllNotifications = async (): Promise<void> => {
    try {
      await notifee.cancelAllNotifications();
      Logger.debug('All notifications cancelled');
    } catch (error) {
      Logger.error(`Error cancelling all notifications: ${error}`);
    }
  };

  readonly cancelNotification = async (notificationId: string): Promise<void> => {
    try {
      await notifee.cancelNotification(notificationId);
      Logger.debug(`Notification cancelled: ${notificationId}`);
    } catch (error) {
      Logger.error(`Error cancelling notification ${notificationId}: ${error}`);
    }
  };

  /**
   * @returns Current badge count, or 0 if unable to retrieve (Android compatibility)
   */
  readonly getBadgeCount = async (): Promise<number> => {
    try {
      return await notifee.getBadgeCount();
    } catch (error) {
      Logger.error(`Error getting badge count: ${error}`);
      return 0;
    }
  };

  readonly setBadgeCount = async (count: number): Promise<void> => {
    try {
      await notifee.setBadgeCount(count);
      Logger.debug(`Badge count set to: ${count}`);
    } catch (error) {
      Logger.error(`Error setting badge count: ${error}`);
    }
  };
}

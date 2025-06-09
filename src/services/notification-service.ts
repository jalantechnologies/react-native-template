import notifee, { AndroidImportance, EventType, TriggerType } from '@notifee/react-native';

export class NotificationService {
  private isInitialized = false;

  // Public method to initialize the service
  initialize = async (): Promise<void> => {
    if (!this.isInitialized) {
      await this.initializeNotifee();
    }
  };

  private readonly initializeNotifee = async (): Promise<void> => {
    try {
      // Request permissions
      await notifee.requestPermission();

      // Create notification channels for Android
      await this.createNotificationChannels();

      // Setup background event handlers
      this.setupBackgroundEventHandlers();

      this.isInitialized = true;
      console.log('Notifee initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Notifee:', error);
    }
  };

  private readonly createNotificationChannels = async (): Promise<void> => {
    // Default channel
    await notifee.createChannel({
      id: 'default',
      name: 'Default Notifications',
      description: 'Default notification channel',
      importance: AndroidImportance.DEFAULT,
      sound: 'default',
      vibration: true,
    });

    // High priority channel
    await notifee.createChannel({
      id: 'high-priority',
      name: 'High Priority',
      description: 'High priority notifications',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    });

    // Messages channel
    await notifee.createChannel({
      id: 'messages',
      name: 'Messages',
      description: 'Chat and message notifications',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    });

    console.log('Notification channels created');
  };

  private readonly setupBackgroundEventHandlers = (): void => {
    // Handle background events (user interactions with notifications)
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      try {
        const { notification, pressAction } = detail;

        switch (type) {
          case EventType.DISMISSED:
            console.log('Background: User dismissed notification', notification?.id);
            break;
          case EventType.PRESS:
            console.log('Background: User pressed notification', notification?.id);
            await this.handleNotificationPress(notification);
            break;
          case EventType.ACTION_PRESS:
            console.log('Background: User pressed action', pressAction?.id);
            await this.handleActionPress(pressAction?.id, notification);
            break;
        }
      } catch (error) {
        console.error('Error handling background event:', error);
      }
    });
  };

  readonly setupForegroundEventHandlers = () => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          // Handle navigation based on notification data
          if (detail.notification?.data) {
            console.log('Notification data:', detail.notification.data);
            // Add your navigation logic here
          }
          break;
      }
    });
  };

  // Method to handle foreground notifications
  readonly handleForegroundNotification = async (remoteMessage: any): Promise<void> => {
    try {
      if (remoteMessage.notification) {
        console.log('Foreground notification:', remoteMessage.notification);

        // Display notification even in foreground for better UX
        await this.displayLocalNotification(
          remoteMessage.notification.title ?? 'New Message',
          remoteMessage.notification.body ?? '',
          remoteMessage.data,
        );
      }
    } catch (error) {
      console.error('Error handling foreground notification:', error);
    }
  };

  // Handle notification press events
  private readonly handleNotificationPress = async (notification: any): Promise<void> => {
    try {
      if (notification?.data) {
        console.log('Handling notification press with data:', notification.data);

        // Add your navigation logic here based on notification data
        const { type, params } = notification.data;

        switch (type) {
          case 'message':
            // Navigate to chat screen
            console.log('Navigate to chat:', params);
            break;
          case 'task':
            // Navigate to task screen
            console.log('Navigate to task:', params);
            break;
          default:
            console.log('Default notification press handling');
        }
      }
    } catch (error) {
      console.error('Error handling notification press:', error);
    }
  };

  // Handle action press events
  private readonly handleActionPress = async (
    actionId: string | undefined,
    _notification: any,
  ): Promise<void> => {
    try {
      console.log('Action pressed:', actionId);

      switch (actionId) {
        case 'reply':
          console.log('Reply action pressed');
          // Handle reply action
          break;
        case 'mark-read':
          console.log('Mark as read action pressed');
          // Handle mark as read action
          break;
        default:
          console.log('Unknown action pressed:', actionId);
      }
    } catch (error) {
      console.error('Error handling action press:', error);
    }
  };

  // Public method to display local notifications (used by Firebase messaging)
  readonly displayNotification = async (title: string, body: string, data?: any): Promise<void> => {
    await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        color: '#FF6B35',
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default',
        categoryId: 'default',
      },
    });
  };

  // Public method to display local notifications
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
          // Fixed vibration pattern
          vibrationPattern: [0, 300, 500, 300],
        },
        ios: {
          sound: 'default',
        },
      });
    } catch (error) {
      console.error('Error displaying local notification:', error);
    }
  };

  // Schedule a notification
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
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  // Cancel all notifications
  readonly cancelAllNotifications = async (): Promise<void> => {
    try {
      await notifee.cancelAllNotifications();
      console.log('All notifications cancelled');
    } catch (error) {
      console.error('Error cancelling notifications:', error);
    }
  };

  // Cancel notification by ID
  readonly cancelNotification = async (notificationId: string): Promise<void> => {
    try {
      await notifee.cancelNotification(notificationId);
      console.log('Notification cancelled:', notificationId);
    } catch (error) {
      console.error('Error cancelling notification:', error);
    }
  };

  // Get badge count (iOS)
  readonly getBadgeCount = async (): Promise<number> => {
    try {
      return await notifee.getBadgeCount();
    } catch (error) {
      console.error('Error getting badge count:', error);
      return 0;
    }
  };

  // Set badge count (iOS)
  readonly setBadgeCount = async (count: number): Promise<void> => {
    try {
      await notifee.setBadgeCount(count);
    } catch (error) {
      console.error('Error setting badge count:', error);
    }
  };
}

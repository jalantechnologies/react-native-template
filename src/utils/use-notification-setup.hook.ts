import notifee, { AndroidImportance } from '@notifee/react-native';
import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';

import { useNotificationSettings } from '../contexts/notification-context';
import { FirebaseMessagingService } from '../services/firebase-messageing.service';
import { NotificationService } from '../services/notification-service';
import { NotificationType } from '../types/notification.types';

/**
 * Hook to setup and manage notification handling based on user preferences
 */
export const useNotificationSetup = () => {
  // Get notification settings from context
  const { settings, isLoading } = useNotificationSettings();

  useEffect(() => {
    // Skip setup until settings are loaded
    if (isLoading) {
      return;
    }

    const setupNotifications = async () => {
      // Initialize services
      const notificationService = new NotificationService();
      const firebaseMessagingService = new FirebaseMessagingService();

      // Initialize notification service
      await notificationService.initialize();

      // Setup foreground event handlers for Notifee
      const unsubscribeNotifee = notificationService.setupForegroundEventHandlers();

      // Create a handler for displaying notifications that respects user preferences
      const handleNotificationDisplay = async (
        title: string,
        body: string,
        data?: any,
      ): Promise<void> => {
        // Extract notification type from data or default to 'alert'
        const type = (data?.type as NotificationType) || 'alert';

        // Check if notifications are globally disabled
        if (!settings.masterToggle) {
          console.log('Notifications are globally disabled');
          return;
        }

        // Check if this specific notification type is enabled
        if (!settings.preferences[type]?.enabled) {
          console.log(`Notifications of type ${type} are disabled by user`);
          return;
        }

        // Check if app is in foreground and foreground notifications are disabled
        const isAppActive = AppState.currentState === 'active';
        if (isAppActive && !settings.showInForeground) {
          console.log('App is active and foreground notifications are disabled');

          // Optionally, update an in-app counter or badge instead
          if (Platform.OS === 'ios' && type === 'message') {
            const currentBadgeCount = await notificationService.getBadgeCount();
            await notificationService.setBadgeCount(currentBadgeCount + 1);
          }

          return;
        }

        // Get preference settings for this notification type
        const preference = settings.preferences[type];

        // Determine channel based on importance setting
        let channelId: string;
        switch (preference.importance) {
          case 'high':
            channelId = 'high-priority';
            break;
          case 'low':
            channelId = 'low-priority';
            break;
          default:
            channelId = 'default';
        }

        // Use message-specific channel for messages
        if (type === 'message') {
          channelId = 'messages';
        }

        // Configure notification based on preferences
        const notificationConfig = {
          title,
          body,
          data: {
            ...data,
            type, // Ensure type is included in data
          },
          android: {
            channelId,
            sound: preference.sound ? 'default' : undefined,
            vibrationPattern: preference.vibration ? [0, 300, 500, 300] : [],
            pressAction: {
              id: 'default',
            },
            importance:
              preference.importance === 'high'
                ? AndroidImportance.HIGH
                : preference.importance === 'low'
                ? AndroidImportance.LOW
                : AndroidImportance.DEFAULT,
          },
          ios: {
            sound: preference.sound ? 'default' : undefined,
            // Add category based on type for iOS action handling
            categoryId: type === 'message' ? 'message' : 'default',
          },
        };

        // Display the notification
        await notifee.displayNotification(notificationConfig);
      };

      // Initialize Firebase messaging with the enhanced notification display method
      const unsubscribeFirebase = await firebaseMessagingService.initialize(
        handleNotificationDisplay,
      );

      // Cleanup function
      return () => {
        unsubscribeFirebase();
        unsubscribeNotifee();
      };
    };

    let cleanup: (() => void) | undefined;

    setupNotifications().then(cleanupFn => {
      cleanup = cleanupFn;
    });

    // Return cleanup function
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [isLoading, settings]); // Re-run when settings change or finish loading
};

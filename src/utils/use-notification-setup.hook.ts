import { useEffect } from 'react';

import { FirebaseMessagingService } from '../services/firebase-messageing.service';
import { NotificationService } from '../services/notification-service';

export const useNotificationSetup = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      // Initialize services
      const notificationService = new NotificationService();
      const firebaseMessagingService = new FirebaseMessagingService();

      // Initialize notification service
      await notificationService.initialize();

      // Setup foreground event handlers for Notifee
      const unsubscribeNotifee = notificationService.setupForegroundEventHandlers();

      // Initialize Firebase messaging with the notification display method
      const unsubscribeFirebase = await firebaseMessagingService.initialize(
        notificationService.displayNotification,
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
  }, []);
};

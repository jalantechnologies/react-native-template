import { useEffect } from 'react';

import { FirebaseMessagingService } from '../services/firebase-messageing.service';
import { NotificationService } from '../services/notification-service';

/**
 * Hook to setup notifications without requiring NotificationContext
 * This is safe to use anywhere, including App.tsx
 */
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

      // Use the basic displayNotification method for now
      // Later, when the NotificationContext is available, we'll enhance this
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

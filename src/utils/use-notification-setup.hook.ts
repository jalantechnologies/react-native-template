import { useEffect } from 'react';

import { FirebaseMessagingService } from '../services/firebase-messageing.service';
import { NotificationService } from '../services/notification-service';

export const useNotificationSetup = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      const notificationService = new NotificationService();
      const firebaseMessagingService = new FirebaseMessagingService();

      await notificationService.initialize();

      const unsubscribeNotificationHandlers = notificationService.setupForegroundEventHandlers();

      const unsubscribeFirebase = await firebaseMessagingService.initialize(
        notificationService.displayNotification,
      );

      return () => {
        unsubscribeFirebase();
        unsubscribeNotificationHandlers();
      };
    };

    let cleanup: (() => void) | undefined;
    setupNotifications().then(cleanupFn => {
      cleanup = cleanupFn;
    });

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);
};

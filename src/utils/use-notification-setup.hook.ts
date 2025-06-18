import { useEffect } from 'react';

import Logger from '../logger/logger';
import { FirebaseMessagingService } from '../services/firebase-messageing.service';
import { NotificationService } from '../services/notification-service';

export const useNotificationSetup = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      try {
        const notificationService = new NotificationService();
        await notificationService.initialize();

        const firebaseMessagingService = new FirebaseMessagingService();
        const unsubscribeFirebase = await firebaseMessagingService.initialize(
          notificationService.displayNotification,
        );

        return () => {
          unsubscribeFirebase();
        };
      } catch (error) {
        Logger.error(`Error setting up notifications: ${error}`);
        return () => {};
      }
    };

    let cleanup: (() => void) | undefined;
    setupNotifications().then(fn => {
      cleanup = fn;
    });

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);
};

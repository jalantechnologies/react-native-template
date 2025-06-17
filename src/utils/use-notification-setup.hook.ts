import { useEffect } from 'react';

import Logger from '../logger/logger';
import { FirebaseMessagingService } from '../services/firebase-messageing.service';
import { NotificationService } from '../services/notification-service';

/**
 * Custom React hook to initialize and clean up notification services on component mount.
 *
 * Why: This hook ensures that our no-op NotificationService and the Firebase messaging
 * service are set up exactly once, and that all listeners are properly torn down when
 * the component unmounts, preventing memory leaks or orphaned callbacks.
 */
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

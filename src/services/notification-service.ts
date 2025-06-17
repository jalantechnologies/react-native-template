import Logger from '../logger/logger';

export class NotificationService {
  private isInitialized = false;

  /**
   * Initializes the notification service once. Subsequent calls are no-ops.
   *
   * Why: To simulate the initialization step in the original implementation,
   * we only log once and set a flag. This prevents repeated log spam.
   */
  initialize = async (): Promise<void> => {
    if (!this.isInitialized) {
      await this.initializeNotifications();
    }
  };

  /**
   * Internal method to perform the initialization logic.
   *
   * Behavior: Logs that notifications are disabled and sets `isInitialized` to true.
   * Logs errors if the process fails (should not happen in this stub).
   */
  private readonly initializeNotifications = async (): Promise<void> => {
    try {
      Logger.debug('Push notifications have been disabled in this version');
      this.isInitialized = true;
    } catch (error) {
      Logger.error(`Failed to initialize notifications: ${error}`);
    }
  };

  /**
   * Stub for registering event handlers when the app is in the foreground.
   *
   * Returns an empty cleanup function since no actual handlers are attached.
   *
   * @returns A no-op function to match the expected cleanup signature.
   */
  setupForegroundEventHandlers = () => {
    return () => {};
  };

  /**
   * Stub for handling an incoming foreground notification.
   *
   * Always logs that notifications are disabled instead of processing any payload.
   */
  readonly handleForegroundNotification = async (): Promise<void> => {
    Logger.debug('Push notifications are disabled; cannot handle foreground notification');
  };

  /**
   * Logs the details of a notification that would have been displayed.
   *
   * @param title - The notification title that would be shown.
   * @param body - The notification body text.
   */
  readonly displayNotification = async (title: string, body: string): Promise<void> => {
    Logger.debug(`Notification would have been displayed - Title: ${title}, Body: ${body}`);
  };

  /**
   * Logs the details of a local notification that would have been displayed.
   *
   * Why: Local notifications are scheduled solely on the device; this stub preserves
   * the interface for existing code paths.
   *
   * @param title - The local notification title.
   * @param body - The local notification content.
   */
  readonly displayLocalNotification = async (title: string, body: string): Promise<void> => {
    Logger.debug(`Local notification would have been displayed - Title: ${title}, Body: ${body}`);
  };

  /**
   * Logs when a scheduled notification would have been set.
   *
   * @param title - The title for the scheduled notification.
   * @param body - The content for the scheduled notification.
   * @param timestamp - Epoch milliseconds when the notification should fire.
   */
  readonly scheduleNotification = async (
    title: string,
    body: string,
    timestamp: number,
  ): Promise<void> => {
    Logger.debug(
      `Notification would have been scheduled - Title: ${title}, Time: ${new Date(
        timestamp,
      ).toISOString()}`,
    );
  };

  /**
   * Logs that all notifications would be cancelled.
   *
   * Why: Retains the cancelAllNotifications signature for existing callers.
   */
  readonly cancelAllNotifications = async (): Promise<void> => {
    Logger.debug('All notifications would have been cancelled');
  };

  /**
   * Logs that a specific notification would be cancelled by ID.
   *
   * @param notificationId - Identifier of the notification to cancel.
   */
  readonly cancelNotification = async (notificationId: string): Promise<void> => {
    Logger.debug(`Notification ${notificationId} would have been cancelled`);
  };

  /**
   * Returns the current badge count. Always 0 in this stub implementation.
   *
   * @returns 0, since badge functionality is disabled.
   */
  readonly getBadgeCount = async (): Promise<number> => {
    return 0;
  };

  /**
   * Logs the badge count that would have been set on the app icon.
   *
   * @param count - The desired badge count value.
   */
  readonly setBadgeCount = async (count: number): Promise<void> => {
    Logger.debug(`Badge count would have been set to: ${count}`);
  };
}

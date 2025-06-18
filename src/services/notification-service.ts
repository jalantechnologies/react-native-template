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
      Logger.debug('Push notifications have been disabled in this version');
      this.isInitialized = true;
    } catch (error) {
      Logger.error(`Failed to initialize notifications: ${error}`);
    }
  };

  setupForegroundEventHandlers = () => {
    return () => {};
  };

  readonly handleForegroundNotification = async (): Promise<void> => {
    Logger.debug('Push notifications are disabled; cannot handle foreground notification');
  };

  readonly displayNotification = async (title: string, body: string): Promise<void> => {
    Logger.debug(`Notification would have been displayed - Title: ${title}, Body: ${body}`);
  };

  readonly displayLocalNotification = async (title: string, body: string): Promise<void> => {
    Logger.debug(`Local notification would have been displayed - Title: ${title}, Body: ${body}`);
  };

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

  readonly cancelAllNotifications = async (): Promise<void> => {
    Logger.debug('All notifications would have been cancelled');
  };

  readonly cancelNotification = async (notificationId: string): Promise<void> => {
    Logger.debug(`Notification ${notificationId} would have been cancelled`);
  };

  readonly getBadgeCount = async (): Promise<number> => {
    return 0;
  };

  readonly setBadgeCount = async (count: number): Promise<void> => {
    Logger.debug(`Badge count would have been set to: ${count}`);
  };
}

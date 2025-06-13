declare module 'react-native-push-notification' {
  export interface Channel {
    channelId: string;
    channelName: string;
    channelDescription?: string;
    playSound?: boolean;
    soundName?: string;
    importance?: number;
    vibrate?: boolean;
    vibration?: number;
  }

  export enum Importance {
    DEFAULT = 3,
    HIGH = 4,
    LOW = 2,
    MIN = 1,
    NONE = 0,
  }

  export interface PushNotificationObject {
    channelId?: string;
    ticker?: string;
    showWhen?: boolean;
    autoCancel?: boolean;
    largeIcon?: string;
    smallIcon?: string;
    bigText?: string;
    subText?: string;
    color?: string;
    vibrate?: boolean;
    vibration?: number;
    tag?: string;
    group?: string;
    groupSummary?: boolean;
    ongoing?: boolean;
    priority?: 'max' | 'high' | 'low' | 'min' | 'default';
    visibility?: 'private' | 'public' | 'secret';
    importance?: 'default' | 'max' | 'high' | 'low' | 'min' | 'none' | 'unspecified';
    ignoreInForeground?: boolean;
    shortcutId?: string;
    onlyAlertOnce?: boolean;
    messageId?: string;

    alertAction?: string;
    category?: string;

    id?: string;
    title?: string;
    message: string;
    userInfo?: Object;
    playSound?: boolean;
    soundName?: string;
    number?: string;
    repeatType?: 'week' | 'day' | 'hour' | 'minute' | 'time';
    repeatTime?: number;
    date?: Date;
  }

  export interface PushNotificationScheduleObject extends PushNotificationObject {
    date: Date;
  }

  export interface PushNotificationHandler {
    onRegister: (token: { os: string; token: string }) => void;
    onNotification: (notification: any) => void;
    onAction?: (notification: any) => void;
    onRegistrationError: (error: Error) => void;
    permissions?: {
      alert?: boolean;
      badge?: boolean;
      sound?: boolean;
    };
    popInitialNotification?: boolean;
    requestPermissions?: boolean;
  }

  export function configure(handler: PushNotificationHandler): void;
  export function createChannel(channel: Channel, callback: (created: boolean) => void): void;
  export function localNotification(details: PushNotificationObject): void;
  export function localNotificationSchedule(details: PushNotificationScheduleObject): void;
  export function cancelLocalNotifications(details: { id: string }): void;
  export function cancelLocalNotification(notificationId: string): void;
  export function cancelAllLocalNotifications(): void;
  export function setApplicationIconBadgeNumber(badge: number): void;
  export function getApplicationIconBadgeNumber(callback: (badge: number) => void): void;
  export function getChannels(callback: (channels: Channel[]) => void): void;
  export function checkPermissions(
    callback: (permissions: { alert: boolean; badge: boolean; sound: boolean }) => void,
  ): void;
}

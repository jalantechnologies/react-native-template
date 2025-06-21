export enum NotificationType {
  MESSAGE = 'message',
}

export enum NotificationImportance {
  DEFAULT = 'default',
  HIGH = 'high',
  LOW = 'low',
}

export enum NotificationPlatforms {
  IOS = 'ios',
  ANDROID = 'android',
  WINDOWS = 'windows',
  MACOS = 'macos',
  WEB = 'web',
}

export interface NotificationPreference {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  importance: NotificationImportance;
}

export interface NotificationSettings {
  masterToggle: boolean;
  showInForeground: boolean;
  preferences: Record<NotificationType, NotificationPreference>;
}

export interface NotificationPayload<T = unknown> {
  type: NotificationType;
  title: string;
  body: string;
  data?: T;
}

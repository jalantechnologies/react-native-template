export type NotificationType = 'message';

export interface NotificationPreference {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  importance: 'default' | 'high' | 'low';
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

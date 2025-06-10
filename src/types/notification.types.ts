export type NotificationType =
  | 'message' // Chat and direct messages
  | 'task' // Task assignments and reminders
  | 'alert' // System alerts and important notices
  | 'update' // App updates and news
  | 'reminder' // General reminders
  | 'social'; // Social interactions (likes, mentions, etc.)

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

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  data?: any;
}

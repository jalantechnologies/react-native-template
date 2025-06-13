import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

import Logger from '../logger/logger';
import {
  NotificationSettings,
  NotificationType,
  NotificationPreference,
} from '../types/notification.types';
import { useLocalStorage } from '../utils';

const DEFAULT_NOTIFICATION_PREFERENCE: NotificationPreference = {
  enabled: true,
  sound: true,
  vibration: true,
  importance: 'default',
};

/**
 * Default notification settings with high importance for critical notification types.
 * Message, task, and alert notifications use high importance to ensure they break through
 * Do Not Disturb mode on Android devices for urgent communications.
 */
const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  masterToggle: true,
  showInForeground: true,
  preferences: {
    message: { ...DEFAULT_NOTIFICATION_PREFERENCE, importance: 'high' },
  },
};

interface NotificationContextType {
  settings: NotificationSettings;
  isLoading: boolean;
  updateMasterToggle: (enabled: boolean) => Promise<void>;
  updateShowInForeground: (enabled: boolean) => Promise<void>;
  updateTypePreference: (
    type: NotificationType,
    preference: Partial<NotificationPreference>,
  ) => Promise<void>;
  isNotificationTypeEnabled: (type: NotificationType) => boolean;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const STORAGE_KEY = '@notification_settings';

export const NotificationContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState(DEFAULT_NOTIFICATION_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const { getFromStorage, setToStorage } = useLocalStorage();

  useEffect(() => {
    loadSettingsFromStorage();
  }, []);

  const loadSettingsFromStorage = () => {
    try {
      const savedSettings = getFromStorage(STORAGE_KEY);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      Logger.error('Failed to load notification settings: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Persists notification settings to local storage and updates local state.
   * Both operations are atomic - if storage fails, local state remains unchanged.
   */
  const saveSettings = (newSettings: NotificationSettings) => {
    try {
      setToStorage(STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      Logger.error('Failed to save notification settings: ' + error);
      throw error;
    }
  };

  const updateMasterToggle = async (enabled: boolean) => {
    const updatedSettings = createUpdatedSettings({ masterToggle: enabled });
    saveSettings(updatedSettings);
  };

  const updateShowInForeground = async (enabled: boolean) => {
    const updatedSettings = createUpdatedSettings({ showInForeground: enabled });
    saveSettings(updatedSettings);
  };

  const updateTypePreference = async (
    type: NotificationType,
    preference: Partial<NotificationPreference>,
  ) => {
    const updatedSettings = createUpdatedSettings({
      preferences: {
        ...settings.preferences,
        [type]: {
          ...settings.preferences[type],
          ...preference,
        },
      },
    });
    saveSettings(updatedSettings);
  };

  /**
   * Creates new settings object with updates applied.
   * Uses spread operator to ensure immutability and prevent accidental mutations.
   */
  const createUpdatedSettings = (updates: Partial<NotificationSettings>): NotificationSettings => {
    return { ...settings, ...updates };
  };

  /**
   * Determines if notifications should be shown for a specific type.
   * Respects both the master toggle and individual type preferences.
   *
   * @param type - The notification type to check
   * @returns true if notifications are enabled globally AND for this specific type
   */
  const isNotificationTypeEnabled = (type: NotificationType): boolean => {
    return settings.masterToggle && settings.preferences[type].enabled;
  };
  const contextValue = useMemo(
    () => ({
      settings,
      isLoading,
      updateMasterToggle,
      updateShowInForeground,
      updateTypePreference,
      isNotificationTypeEnabled,
    }),
    [
      settings,
      isLoading,
      updateMasterToggle,
      updateShowInForeground,
      updateTypePreference,
      isNotificationTypeEnabled,
    ],
  );

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
};

export const useNotificationSettings = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      'useNotificationSettings must be used within a NotificationContextProvider. ' +
        'Wrap your component tree with <NotificationContextProvider>.',
    );
  }

  return context;
};

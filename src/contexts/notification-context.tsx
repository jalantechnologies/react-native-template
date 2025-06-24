import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

import Logger from '../logger/logger';
import {
  NotificationImportance,
  NotificationPreference,
  NotificationSettings,
  NotificationType,
} from '../types/notification.types';
import { useLocalStorage } from '../utils';

const DEFAULT_NOTIFICATION_PREFERENCE: NotificationPreference = {
  enabled: true,
  importance: NotificationImportance.DEFAULT,
  sound: true,
  vibration: true,
};

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  masterToggle: true,
  preferences: {
    [NotificationType.MESSAGE]: {
      ...DEFAULT_NOTIFICATION_PREFERENCE,
      importance: NotificationImportance.HIGH,
    },
  },
  showInForeground: true,
};

interface NotificationContextType {
  isLoading: boolean;
  isNotificationTypeEnabled: (type: NotificationType) => boolean;
  settings: NotificationSettings;
  updateMasterToggle: (enabled: boolean) => Promise<void>;
  updateShowInForeground: (enabled: boolean) => Promise<void>;
  updateTypePreference: (
    type: NotificationType,
    preference: Partial<NotificationPreference>,
  ) => Promise<void>;
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

  const createUpdatedSettings = (updates: Partial<NotificationSettings>): NotificationSettings => {
    return { ...settings, ...updates };
  };

  const isNotificationTypeEnabled = (type: NotificationType): boolean => {
    return settings.masterToggle && settings.preferences[type].enabled;
  };

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

  const contextValue = useMemo(
    () => ({
      isLoading,
      isNotificationTypeEnabled,
      settings,
      updateMasterToggle,
      updateShowInForeground,
      updateTypePreference,
    }),
    [
      isLoading,
      isNotificationTypeEnabled,
      settings,
      updateMasterToggle,
      updateShowInForeground,
      updateTypePreference,
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

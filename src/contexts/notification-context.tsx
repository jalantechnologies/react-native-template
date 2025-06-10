import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, useEffect } from 'react';

import {
  NotificationSettings,
  NotificationType,
  NotificationPreference,
} from '../types/notification.types';

const DEFAULT_NOTIFICATION_PREFERENCE: NotificationPreference = {
  enabled: true,
  sound: true,
  vibration: true,
  importance: 'default',
};

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  masterToggle: true,
  showInForeground: true,
  preferences: {
    message: { ...DEFAULT_NOTIFICATION_PREFERENCE, importance: 'high' },
    task: { ...DEFAULT_NOTIFICATION_PREFERENCE, importance: 'high' },
    alert: { ...DEFAULT_NOTIFICATION_PREFERENCE, importance: 'high' },
    update: { ...DEFAULT_NOTIFICATION_PREFERENCE },
    reminder: { ...DEFAULT_NOTIFICATION_PREFERENCE },
    social: { ...DEFAULT_NOTIFICATION_PREFERENCE },
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
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }
      } catch (error) {
        console.error('Failed to load notification settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings whenever they change
  const saveSettings = async (newSettings: NotificationSettings) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    }
  };

  const updateMasterToggle = async (enabled: boolean) => {
    const newSettings = {
      ...settings,
      masterToggle: enabled,
    };
    await saveSettings(newSettings);
  };

  const updateShowInForeground = async (enabled: boolean) => {
    const newSettings = {
      ...settings,
      showInForeground: enabled,
    };
    await saveSettings(newSettings);
  };

  const updateTypePreference = async (
    type: NotificationType,
    preference: Partial<NotificationPreference>,
  ) => {
    const newSettings = {
      ...settings,
      preferences: {
        ...settings.preferences,
        [type]: {
          ...settings.preferences[type],
          ...preference,
        },
      },
    };
    await saveSettings(newSettings);
  };

  const isNotificationTypeEnabled = (type: NotificationType): boolean => {
    return settings.masterToggle && settings.preferences[type].enabled;
  };

  return (
    <NotificationContext.Provider
      value={{
        settings,
        isLoading,
        updateMasterToggle,
        updateShowInForeground,
        updateTypePreference,
        isNotificationTypeEnabled,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationSettings = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationSettings must be used within a NotificationContextProvider');
  }
  return context;
};

import 'react-native-gesture-handler';
import { DatadogProvider } from '@datadog/mobile-react-native';
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';
import { NativeBaseProvider } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import appTheme from './app-theme';
import { ErrorFallback } from './components';
import { AccountContextProvider, AuthContextProvider, TaskContextProvider } from './contexts';
import Logger from './logger/logger';
import ApplicationNavigator from './navigators/application';
import './translations';
import DatadogConfig, { onDataDogSDKInitialized } from './services/datadog';
import './services/notification-service';

const App = () => {
  Logger.initializeLoggers();
  const ErrorComponent = useCallback(() => <ErrorFallback />, []);

  const requestUserPermission = async () => {
    try {
      const app = getApp();
      const messaging = getMessaging(app);

      const authStatus = await requestPermission(messaging);
      const enabled =
        authStatus === 1 || // AUTHORIZED
        authStatus === 2; // PROVISIONAL

      if (enabled) {
        console.log('Notification permission status:', authStatus);
        getFcmToken(messaging);
      } else {
        Alert.alert('Push Notification permission denied');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const getFcmToken = async (messaging: any) => {
    try {
      const fcmToken = await getToken(messaging);

      if (fcmToken) {
        console.log('Fcm Token', fcmToken);
      } else {
        console.log('Failed to get Fcm token');
      }
    } catch (error) {
      console.error('Error fetching FCM token:', error);
    }
  };

  useEffect(() => {
    const app = getApp();
    const messaging = getMessaging(app);

    // Set up background message handler
    setBackgroundMessageHandler(messaging, async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);

      // Display notification using your preferred notification library
      // Example with basic Alert (you should use a proper notification library like Notifee)
      if (remoteMessage.notification) {
        // Note: Alert won't work in background, this is just for demonstration
        // Use Notifee or similar library for actual background notifications
        console.log('Background notification:', remoteMessage.notification);
      }
    });

    requestUserPermission();

    const unsubscribe = onMessage(messaging, async remoteMessage => {
      console.log('Received foreground message:', remoteMessage);

      // Handle foreground notifications
      if (remoteMessage.notification) {
        Alert.alert(
          remoteMessage.notification.title ?? 'New Notification',
          remoteMessage.notification.body ?? '',
        );
      }
    });

    onNotificationOpenedApp(messaging, remoteMessage => {
      console.log('Notification opened from background state:', remoteMessage.notification);
      // Handle navigation or other actions when notification is tapped
    });

    getInitialNotification(messaging).then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage?.notification,
        );
        // Handle navigation or other actions when app is opened from notification
      }
    });

    return unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={appTheme}>
      <ErrorBoundary
        onError={(e, stack) => Logger.error(`App Error: ${e} ${stack}`)}
        FallbackComponent={ErrorComponent}
      >
        <DatadogProvider configuration={DatadogConfig} onInitialization={onDataDogSDKInitialized}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AuthContextProvider>
              <AccountContextProvider>
                <TaskContextProvider>
                  <ApplicationNavigator />
                </TaskContextProvider>
              </AccountContextProvider>
            </AuthContextProvider>
          </SafeAreaProvider>
        </DatadogProvider>
      </ErrorBoundary>
    </NativeBaseProvider>
  );
};

export default App;

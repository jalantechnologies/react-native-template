import 'react-native-gesture-handler';
import { DatadogProvider } from '@datadog/mobile-react-native';
import { NativeBaseProvider } from 'native-base';
import React, { useCallback } from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import appTheme from './app-theme';
import { ErrorFallback } from './components';
import { AccountContextProvider, AuthContextProvider, TaskContextProvider } from './contexts';
import Logger from './logger/logger';
import ApplicationNavigator from './navigators/application';
import './translations';
import DatadogConfig, { onDataDogSDKInitialized } from './services/datadog';
import { useNotificationSetup } from './utils/use-notification-setup.hook';

const App = () => {
  Logger.initializeLoggers();
  const ErrorComponent = useCallback(() => <ErrorFallback />, []);

  useNotificationSetup();

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

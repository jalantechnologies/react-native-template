import { DatadogProvider } from '@datadog/mobile-react-native';
import React, { useCallback } from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { Text, View } from 'react-native';
import { AccountContextProvider, AuthContextProvider, TaskContextProvider, ToastProvider } from './contexts';
import Logger from './logger/logger';
import ApplicationNavigator from './navigators/application';
import DatadogConfig, { onDataDogSDKInitialized } from './services/datadog';
import { theme } from './theme';
import './translations';

const ErrorFallback = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 20 }}>Oops! Something went wrong.</Text>
  </View>
);

const App = () => {
  Logger.initializeLoggers();
  const ErrorComponent = useCallback(() => <ErrorFallback />, []);

  return (
    <PaperProvider theme={theme}>
      <ErrorBoundary
        onError={(e, stack) => Logger.error(`App Error: ${e} ${stack}`)}
        FallbackComponent={ErrorComponent}
      >
        <DatadogProvider configuration={DatadogConfig} onInitialization={onDataDogSDKInitialized}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AuthContextProvider>
              <AccountContextProvider>
                <TaskContextProvider>
                  <ToastProvider>
                    <ApplicationNavigator />
                  </ToastProvider>
                </TaskContextProvider>
              </AccountContextProvider>
            </AuthContextProvider>
          </SafeAreaProvider>
        </DatadogProvider>
      </ErrorBoundary>
    </PaperProvider>
  );
};

export default App;

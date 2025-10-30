import 'react-native-gesture-handler';
import { DatadogProvider } from '@datadog/mobile-react-native';
import { NativeBaseProvider } from 'native-base';
import React, { useCallback } from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider as PaperProvider, MD3LightTheme as DefaultPaperTheme } from 'react-native-paper';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import appTheme from './app-theme';
import { ErrorFallback } from './components';
import { AccountContextProvider, AuthContextProvider, TaskContextProvider } from './contexts';
import Logger from './logger/logger';
import ApplicationNavigator from './navigators/application';
import './translations';
import DatadogConfig, { onDataDogSDKInitialized } from './services/datadog';

const paperTheme = {
  ...DefaultPaperTheme,
  roundness: 6,
  colors: {
    ...DefaultPaperTheme.colors,
    primary: '#007AFF',
    onPrimary: '#FFFFFF',
    error: '#FF3B30',
    outline: '#E5E5E5',
    onSurfaceVariant: '#525252',
    background: '#FFFFFF',
    surface: '#FFFFFF',
  },
} as const;

const App = () => {
  Logger.initializeLoggers();
  const ErrorComponent = useCallback(() => <ErrorFallback />, []);

  return (
    <NativeBaseProvider theme={appTheme}>
      <ErrorBoundary
        onError={(e, stack) => Logger.error(`App Error: ${e} ${stack}`)}
        FallbackComponent={ErrorComponent}
      >
        <DatadogProvider configuration={DatadogConfig} onInitialization={onDataDogSDKInitialized}>
          <PaperProvider theme={paperTheme}>
            <SafeAreaProvider initialMetrics={initialWindowMetrics}>
              <AuthContextProvider>
                <AccountContextProvider>
                  <TaskContextProvider>
                    <ApplicationNavigator />
                  </TaskContextProvider>
                </AccountContextProvider>
              </AuthContextProvider>
            </SafeAreaProvider>
          </PaperProvider>
        </DatadogProvider>
      </ErrorBoundary>
    </NativeBaseProvider>
  );
};

export default App;

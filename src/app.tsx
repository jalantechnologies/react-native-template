import 'react-native-gesture-handler';
import { DatadogProvider } from '@datadog/mobile-react-native';
import { NativeBaseProvider } from 'native-base';
import React, { useCallback } from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import appTheme from './app-theme';
import { ErrorFallback } from './components';
import { AccountContextProvider, AuthContextProvider, TaskContextProvider } from './contexts';
import Logger from './logger/logger';
import ApplicationNavigator from './navigators/application';
import './translations';
import DatadogConfig, { onDataDogSDKInitialized } from './services/datadog';

const customPaperTheme = {
  ...MD3LightTheme,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    buttonTop: 55,
    buttonRight: 30,
  },
  iconSize: {
    small: 16,
    medium: 24,
    large: 32,
  },
  zIndex: {
    base: 1,
    dropdown: 100,
    modal: 1000,
    toast: 2000,
  },
  duration: {
    snackbar: {
      success: 3000,
      error: 4000,
      info: 3000,
    },
  },
  textDecoration: {
    none: 'none',
    underline: 'underline',
  },
};

const App = () => {
  Logger.initializeLoggers();
  const ErrorComponent = useCallback(() => <ErrorFallback />, []);

  return (
    <PaperProvider theme={customPaperTheme}>
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
    </PaperProvider>
  );
};

export default App;

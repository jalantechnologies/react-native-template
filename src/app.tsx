import 'react-native-gesture-handler';
import { DatadogProvider } from '@datadog/mobile-react-native';
import { NativeBaseProvider } from 'native-base';
import React, { useCallback } from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { MD3LightTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import appTheme from './app-theme';
import { ErrorFallback } from './components';
import { AccountContextProvider, AuthContextProvider, TaskContextProvider } from './contexts';
import Logger from './logger/logger';
import ApplicationNavigator from './navigators/application';
import './translations';
import DatadogConfig, { onDataDogSDKInitialized } from './services/datadog';

const App = () => {
  Logger.initializeLoggers();
  const ErrorComponent = useCallback(() => <ErrorFallback />, []);

  const paperTheme = {
    ...PaperDefaultTheme,
    roundness: appTheme.radii.sm,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: appTheme.colors.primary['500'],
      outline: appTheme.colors.secondary['200'],
      onPrimary: appTheme.colors.white,
    },
  } as const;

  return (
    <NativeBaseProvider theme={appTheme}>
      <PaperProvider theme={paperTheme}>
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
      </PaperProvider>
    </NativeBaseProvider>
  );
};

export default App;

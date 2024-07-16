import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import ApplicationNavigator from './navigators/application';
import './translations';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { AccountContextProvider, AuthContextProvider } from './contexts';
import { ErrorFallback } from './components';
import appTheme from './app-theme';
import { DatadogProvider } from '@datadog/mobile-react-native';
import DatadogConfig from './services/datadog';
import Logger from './logger/logger';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  Logger.initializeLoggers();
  const ErrorComponent = useCallback(() => <ErrorFallback />, []);

  return (
    <NativeBaseProvider theme={appTheme}>
      <ErrorBoundary
        onError={(e, stack) => Logger.error(`App Error: ${e} ${stack}`)}
        FallbackComponent={ErrorComponent}
      >
        <DatadogProvider configuration={DatadogConfig}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AuthContextProvider>
              <AccountContextProvider>
                <ApplicationNavigator />
              </AccountContextProvider>
            </AuthContextProvider>
          </SafeAreaProvider>
        </DatadogProvider>
      </ErrorBoundary>
    </NativeBaseProvider>
  );
};

export default App;

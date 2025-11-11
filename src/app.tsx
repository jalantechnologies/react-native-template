import 'react-native-gesture-handler';
import { DatadogProvider } from '@datadog/mobile-react-native';
import { NativeBaseProvider } from 'native-base';
import React, { useCallback } from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import type { IconProps } from 'react-native-vector-icons/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import appTheme from './app-theme';
import { ErrorFallback } from './components';
import { AccountContextProvider, AuthContextProvider, TaskContextProvider } from './contexts';
import Logger from './logger/logger';
import ApplicationNavigator from './navigators/application';
import DatadogConfig, { onDataDogSDKInitialized } from './services/datadog';
import './translations';

const MaterialCommunityIconsComponent =
  MaterialCommunityIcons as unknown as React.ComponentType<IconProps>;

const PaperIcon: React.FC<IconProps> = (props) => (
  <MaterialCommunityIconsComponent {...props} />
);

const App = () => {
  Logger.initializeLoggers();
  const ErrorComponent = useCallback(() => <ErrorFallback />, []);

  return (
    <PaperProvider
      settings={{
        icon: PaperIcon,
      }}
      theme={MD3LightTheme}
    >
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

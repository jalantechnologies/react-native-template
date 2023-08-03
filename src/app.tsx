import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import ApplicationNavigator from './navigators/application';
import './translations';
import ErrorBoundary from 'react-native-error-boundary';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { CatContextProvider } from './contexts';
import { ErrorFallback } from './components';
import { ThemeProvider } from '@rneui/themed';
import appTheme from './app-theme';

const App = () => {
  const ErrorComponent = useCallback(() => <ErrorFallback />, []);
  return (
    <ErrorBoundary
      onError={(e, stack) => console.error(`App Error: ${e} ${stack}`)}
      FallbackComponent={ErrorComponent}
    >
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <CatContextProvider>
          <ThemeProvider theme={appTheme}>
            <ApplicationNavigator />
          </ThemeProvider>
        </CatContextProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;

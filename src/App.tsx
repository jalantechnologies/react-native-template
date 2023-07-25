import 'react-native-gesture-handler';
import React from 'react';
import ApplicationNavigator from './navigators/Application';
import './translations';
import ErrorBoundary from 'react-native-error-boundary';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { AccountContextProvider } from './contexts';
import { ErrorFallback } from './components';

const App = () => {
  return (
    <ErrorBoundary
      onError={(e, stack) => console.error(`App Error: ${e} ${stack}`)}
      FallbackComponent={() => <ErrorFallback />}
    >
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AccountContextProvider>
          <ApplicationNavigator />
        </AccountContextProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;

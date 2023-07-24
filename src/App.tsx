import 'react-native-gesture-handler';
import React from 'react';
import ApplicationNavigator from './navigators/Application';
import './translations';
import ErrorBoundary from 'react-native-error-boundary';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { AccountContextProvider } from './contexts';

const App = () => {
  return (
    <ErrorBoundary
      onError={(e, stack) => console.error(`App Error: ${e} ${stack}`)}
      // eslint-disable-next-line react/no-unstable-nested-components
      FallbackComponent={({}) => (
        <SafeAreaView>
          <Text>Oops!</Text>
          <Text>Something went wrong.</Text>
        </SafeAreaView>
      )}
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

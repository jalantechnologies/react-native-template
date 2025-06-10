import 'react-native-gesture-handler';
import { DatadogProvider } from '@datadog/mobile-react-native';
import { NativeBaseProvider } from 'native-base';
import React, { useCallback, useState } from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import appTheme from './app-theme';
import { ErrorFallback } from './components';
import { AccountContextProvider, AuthContextProvider, TaskContextProvider } from './contexts';
import Logger from './logger/logger';
// import ApplicationNavigator from './navigators/application';
import './translations';
import DatadogConfig, { onDataDogSDKInitialized } from './services/datadog';

import { View, Text } from 'react-native';
import RadioButton from './components/radio-button';

const App = () => {
  Logger.initializeLoggers();
  const ErrorComponent = useCallback(() => <ErrorFallback />, []);

  const [selectedValue, setSelectedValue] = useState('option1');

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  }

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
                {/* <TaskContextProvider>
                  <ApplicationNavigator />
                </TaskContextProvider> */}

                <View style={{padding: 24}}>
              <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom:16}}>Choose an Option:</Text>

              <RadioButton
                value="option1"
                label="Primary Option"
                selected={selectedValue === 'option1'}
                onPress={handleRadioChange}
                kind="primary"
              />

              <RadioButton
                value="option2"
                label="Success Option"
                selected={selectedValue === 'option2'}
                onPress={handleRadioChange}
                kind="success"
              />

              <RadioButton
                value="option3"
                label="Error Option"
                selected={selectedValue === 'option3'}
                onPress={handleRadioChange}
                kind="error"
              />

              <RadioButton
                value="option4"
                label="Disabled Option"
                selected={selectedValue === 'option4'}
                onPress={handleRadioChange}
                disabled
              />
            </View>
              </AccountContextProvider>
            </AuthContextProvider>
          </SafeAreaProvider>
        </DatadogProvider>
      </ErrorBoundary>
    </NativeBaseProvider>
  );
};

export default App;

import 'react-native-gesture-handler';
import { DatadogProvider } from '@datadog/mobile-react-native';
import { NativeBaseProvider } from 'native-base';
import React, { useCallback } from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import appTheme from './app-theme';
import { Button, ErrorFallback } from './components';
import { AccountContextProvider, AuthContextProvider, TaskContextProvider } from './contexts';
import Logger from './logger/logger';
import ApplicationNavigator from './navigators/application';
import './translations';
import DatadogConfig, { onDataDogSDKInitialized } from './services/datadog';
import { Text, View } from 'react-native';
import { ButtonKind, ButtonSize } from './types';

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
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <AuthContextProvider>
              <AccountContextProvider>
                {/* <TaskContextProvider>
                  <ApplicationNavigator />
                </TaskContextProvider> */}

                  <View style={{alignItems:'center', margin: 2}}>
                    <Button>Basic Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button disabled>Disabled Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button isLoading>Loading Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button startEnhancer={'😀'} endEnhancer={'😊'}>Enhanced Button</Button>
                  </View>
                  <Text>Different Kinds of Button:</Text>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button kind={ButtonKind.PRIMARY}>Primary Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button kind={ButtonKind.SECONDARY}>Secondary Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button kind={ButtonKind.TERTIARY}>Tertiary Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button kind={ButtonKind.SUCCESS}>Success Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button kind={ButtonKind.DANGER}>Danger Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button kind={ButtonKind.WARNING}>Warning Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button kind={ButtonKind.DARK}>Dark Button</Button>
                  </View>
                  <Text>Different Sizes of Button:</Text>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button size={ButtonSize.MINI}>Mini Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button size={ButtonSize.COMPACT}>Compact Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button size={ButtonSize.DEFAULT}>Default Button</Button>
                  </View>
                  <View style={{alignItems:'center', margin: 2}}>
                    <Button size={ButtonSize.LARGE}>Large Button</Button>
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

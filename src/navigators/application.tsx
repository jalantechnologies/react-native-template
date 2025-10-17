import { DdRumReactNavigationTracking } from '@datadog/mobile-react-navigation';
import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Box } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';

import { ApplicationStackParamList } from '../../@types/navigation';
import { Startup } from '../screens';
import TempDropdownScreen from '../screens/Temp';

import MainNavigator from './main';

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  const onNavigationReady = () => {
    DdRumReactNavigationTracking.startTrackingViews(navigationRef.current);
  };

  return (
    <Box safeAreaTop flex={1}>
      <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
        <StatusBar />
        <Stack.Navigator initialRouteName="TempDropdown" screenOptions={{ headerShown: false }}>
          <Stack.Screen component={TempDropdownScreen} name="TempDropdown" />
          <Stack.Screen component={Startup} name="Startup" />
          <Stack.Screen component={MainNavigator} name="Main" />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  );
};

export default ApplicationNavigator;

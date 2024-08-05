import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { MainParamsList } from '../../@types/navigation';
import { useAuthContext } from '../contexts';
import OTPVerify from '../screens/auth/otp-verify';
import PhoneAuth from '../screens/auth/phone-auth';

import AuthenticatedStack from './authenticated';

const Stack = createStackNavigator<MainParamsList>();

// @refresh reset
const MainNavigator = () => {
  const { isUserAuthenticated } = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isUserAuthenticated ? (
        <Stack.Screen name="Authenticated" component={AuthenticatedStack} />
      ) : (
        <>
          <Stack.Screen name="PhoneAuth" component={PhoneAuth} />
          <Stack.Screen name="OTPVerify" component={OTPVerify} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;

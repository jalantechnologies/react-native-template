import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PhoneAuth from '../screens/auth/phone-auth';
import OTPVerify from '../screens/auth/otp-verify';
import AuthenticatedStack from './authenticated';
import { useAppSelector } from '../contexts';

const Stack = createStackNavigator();

// @refresh reset
const MainNavigator = () => {
  const isUserAuthenticated = useAppSelector(
    state => state.auth.isUserAuthenticated,
  );

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

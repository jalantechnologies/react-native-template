import React from 'react';
import { OTP, SignUp } from '../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthContext } from '../contexts';
import UserPortal from './user-portal';
import { MainParamsList } from '../../@types/navigation';

const Stack = createStackNavigator<MainParamsList>();

// @refresh reset
const MainNavigator = () => {
  const { isUserAuthenticated } = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isUserAuthenticated ? (
        <>
          <Stack.Screen name="UserPortal" component={UserPortal} />
        </>
      ) : (
        <>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="OTP" component={OTP} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;

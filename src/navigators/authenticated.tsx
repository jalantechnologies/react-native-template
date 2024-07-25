import React, { useEffect } from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Dashboard, Profile, RegistrationScreen } from '../screens';
import {
  AuthenticatedDrawerParamsList,
  AuthenticatedStackParamsList,
} from '../../@types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { Spinner } from 'native-base';
import { useAuthContext, useAccountContext } from '../contexts';

const Drawer = createDrawerNavigator<AuthenticatedDrawerParamsList>();
const Stack = createStackNavigator<AuthenticatedStackParamsList>();

const CustomDrawerContent = (props: React.PropsWithChildren<DrawerContentComponentProps>) => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
};

const AuthenticatedStack = () => {
  const { isNewUser, isAccountLoading, getAccountDetails } = useAccountContext();

  useEffect(() => {
    getAccountDetails();
  }, []);

  if (isAccountLoading) {
    return <Spinner flex={1} color={'primary'} size={'lg'} />;
  }

  return isNewUser ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  ) : (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{ headerStatusBarHeight: 0 }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default AuthenticatedStack;

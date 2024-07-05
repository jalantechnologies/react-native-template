import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Dashboard, Registration } from '../screens';
import { logout } from '../contexts/auth-slice';
import { AuthenticatedParamsList } from '../../@types/navigation';
import { useAppDispatch, useAppSelector } from '../contexts';
import { createStackNavigator } from '@react-navigation/stack';
import { Spinner } from 'native-base';

const Drawer = createDrawerNavigator<AuthenticatedParamsList>();
const Stack = createStackNavigator();

const CustomDrawerContent = (
  props: React.PropsWithChildren<DrawerContentComponentProps>,
) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
};

const AuthenticatedStack = () => {
  const isNewUser = useAppSelector(state => state.account.isNewUser);
  const isAccountLoading = useAppSelector(
    state => state.account.isAccountLoading,
  );

  if (isAccountLoading) {
    return <Spinner flex={1} color={'primary'} size={'lg'} />;
  }

  return isNewUser ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Registration" component={Registration} />
    </Stack.Navigator>
  ) : (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
};

export default AuthenticatedStack;

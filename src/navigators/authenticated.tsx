import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Dashboard, RegistrationScreen } from '../screens';
import { logout } from '../redux/slices/auth-slice';
import { AuthenticatedParamsList } from '../../@types/navigation';
import { createStackNavigator } from '@react-navigation/stack';
import { Spinner } from 'native-base';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Drawer = createDrawerNavigator<AuthenticatedParamsList>();
const Stack = createStackNavigator();

const CustomDrawerContent = (props: React.PropsWithChildren<DrawerContentComponentProps>) => {
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
  const isAccountLoading = useAppSelector(state => state.account.isAccountLoading);

  if (isAccountLoading) {
    return <Spinner flex={1} color={'primary'} size={'lg'} />;
  }

  return isNewUser ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  ) : (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
};

export default AuthenticatedStack;

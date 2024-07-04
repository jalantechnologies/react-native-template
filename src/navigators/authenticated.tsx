import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Dashboard } from '../screens';
import { logout } from '../contexts/auth-slice';
import { AuthenticatedParamsList } from '../../@types/navigation';
import { useAppDispatch } from '../contexts';

const Drawer = createDrawerNavigator<AuthenticatedParamsList>();

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
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
};

export default AuthenticatedStack;

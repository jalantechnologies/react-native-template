import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Dashboard } from '../screens';
import { useAuthContext } from '../contexts';
import { AuthenticatedParamsList } from '../../@types/navigation';

const Drawer = createDrawerNavigator<AuthenticatedParamsList>();

const CustomDrawerContent = (
  props: React.PropsWithChildren<DrawerContentComponentProps>,
) => {
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
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
};

export default AuthenticatedStack;

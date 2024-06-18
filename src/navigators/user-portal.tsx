import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Dashboard, Registration } from '../screens';
import { useAccountContext, useAuthContext } from '../contexts';
import { createStackNavigator } from '@react-navigation/stack';
import {
  UserPortalDrawerParamList,
  UserPortalStackParamList,
} from '../../@types/navigation';

const Drawer = createDrawerNavigator<UserPortalDrawerParamList>();
const Stack = createStackNavigator<UserPortalStackParamList>();

const CustomDrawerContent = props => {
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

const UserPortal: React.FC = () => {
  const { isNewUser } = useAccountContext();

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

export default UserPortal;

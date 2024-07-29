import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Spinner, useTheme } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Dashboard, RegistrationScreen } from '../screens';
import { AuthenticatedStackParamsList, AuthenticatedTabParamsList } from '../../@types/navigation';
import { useAccountContext, useAuthContext } from '../contexts';
import ProfileStack from './profile';

const Stack = createStackNavigator<AuthenticatedStackParamsList>();
const Tab = createBottomTabNavigator<AuthenticatedTabParamsList>();

const getTabBarIcon = (routeName: string) => {
  return ({ color, size }: { color: string; size: number }) => {
    let iconName: string;
    switch (routeName) {
      case 'Home':
        iconName = 'home';
        break;
      case 'Profile':
        iconName = 'person';
        break;
      default:
        iconName = 'home';
    }
    return <Icon name={iconName} color={color} size={size} />;
  };
};

const AuthenticatedStack = () => {
  const { isNewUser, isAccountLoading, getAccountDetails } = useAccountContext();
  const { logout } = useAuthContext();
  const { colors } = useTheme();

  useEffect(() => {
    getAccountDetails().catch(() => {
      logout();
    });
  }, []);

  if (isAccountLoading) {
    return <Spinner flex={1} color={'primary'} size={'lg'} />;
  }

  return isNewUser ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  ) : (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: getTabBarIcon(route.name),
        tabBarActiveTintColor: colors.violet[900],
        tabBarInactiveTintColor: colors.muted[400],
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default AuthenticatedStack;

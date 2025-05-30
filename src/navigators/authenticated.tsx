import { DdSdkReactNative } from '@datadog/mobile-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeIcon from 'boilerplate-react-native/assets/icons/home.svg';
import PersonIcon from 'boilerplate-react-native/assets/icons/person.svg';
import { useTheme } from 'native-base';
import React, { useEffect } from 'react';

import { AuthenticatedStackParamsList, AuthenticatedTabParamsList } from '../../@types/navigation';
import { FullScreenSpinner } from '../components';
import { useAccountContext, useAuthContext } from '../contexts';
import { Dashboard, RegistrationScreen } from '../screens';
import { useThemeColor } from '../utils';

import ProfileStack from './profile';

const Stack = createStackNavigator<AuthenticatedStackParamsList>();
const Tab = createBottomTabNavigator<AuthenticatedTabParamsList>();

const getTabBarIcon = (routeName: string) => {
  return ({ color, size }: { color: string; size: number }) => {
    const themeColor = useThemeColor(color);

    let icon;

    switch (routeName) {
      case 'Home':
        icon = <HomeIcon width={size} height={size} fill={themeColor} />;
        break;
      case 'Profile':
        icon = <PersonIcon width={size} height={size} fill={themeColor} />;
        break;
      default:
        icon = <HomeIcon width={size} height={size} fill={themeColor} />;
        break;
    }

    return icon;
  };
};

const AuthenticatedStack = () => {
  const { isNewUser, isAccountLoading, getAccountDetails, accountDetails } = useAccountContext();
  const { logout } = useAuthContext();
  const { colors } = useTheme();

  useEffect(() => {
    getAccountDetails().catch(() => {
      logout();
    });
  }, []);

  useEffect(() => {
    if (!isAccountLoading && accountDetails) {
      DdSdkReactNative.setUserInfo({
        id: accountDetails.id,
        name: accountDetails.displayName(),
      });
    }
  }, [isAccountLoading, accountDetails]);

  if (isAccountLoading) {
    return <FullScreenSpinner />;
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
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: colors.muted[400],
      })}
    >
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default AuthenticatedStack;

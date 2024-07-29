import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileStackParamsList } from '../../@types/navigation';
import { EditProfile, Profile } from '../screens';

const Stack = createStackNavigator<ProfileStackParamsList>();

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Profile} />
    <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{
        headerShown: true,
        title: 'Edit Profile',
        headerBackTitleVisible: false,
        headerStatusBarHeight: 0,
      }}
    />
  </Stack.Navigator>
);

export default ProfileStack;

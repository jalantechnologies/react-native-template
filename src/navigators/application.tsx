// import { DdRumReactNavigationTracking } from '@datadog/mobile-react-navigation';
// import { useFlipper } from '@react-navigation/devtools';
// import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Box } from 'native-base';
// import React from 'react';
// import { StatusBar } from 'react-native';

// import { ApplicationStackParamList } from '../../@types/navigation';
// import { Startup } from '../screens';

// import MainNavigator from './main';

// const Stack = createStackNavigator<ApplicationStackParamList>();

// // @refresh reset
// const ApplicationNavigator = () => {
//   const navigationRef = useNavigationContainerRef();

//   useFlipper(navigationRef);

//   const onNavigationReady = () => {
//     DdRumReactNavigationTracking.startTrackingViews(navigationRef.current);
//   };

//   return (
//     <Box safeAreaTop flex={1}>
//       <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
//         <StatusBar />
//         <Stack.Navigator screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="Startup" component={Startup} />
//           <Stack.Screen name="Main" component={MainNavigator} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Box>
//   );
// };

// export default ApplicationNavigator;

import { DdRumReactNavigationTracking } from '@datadog/mobile-react-navigation';
import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Box } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';

import { ApplicationStackParamList } from '../../@types/navigation';
// import { Startup } from '../screens';
// import MainNavigator from './main';
import TempDropdownScreen from '../screens/Temp'; // 👈 import your test screen

const Stack = createStackNavigator<ApplicationStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  const onNavigationReady = () => {
    DdRumReactNavigationTracking.startTrackingViews(navigationRef.current);
  };

  return (
    <Box safeAreaTop flex={1}>
      <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
        <StatusBar />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* 👇 Only render temp test screen */}
          <Stack.Screen name="TempDropdown" component={TempDropdownScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  );
};

export default ApplicationNavigator;

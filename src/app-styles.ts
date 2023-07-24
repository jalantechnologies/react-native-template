import { Dimensions, StyleSheet } from 'react-native';

export const appStyle = StyleSheet.create({
  appContainer: {
    display: 'flex',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

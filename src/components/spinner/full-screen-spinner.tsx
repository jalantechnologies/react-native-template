import React from 'react';
import { View, StyleSheet } from 'react-native';

import Spinner from './spinner';

const FullScreenSpinner: React.FC = () => (
  <View style={styles.container}>
    <Spinner size="large" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FullScreenSpinner;

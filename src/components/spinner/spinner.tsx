import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Spinner: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="small" color="#000" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;

import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

interface SpinnerProps {
  size: 'small' | 'large';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'small' }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color="#000" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Spinner;

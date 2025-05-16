import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { styles } from './spinner.styles';
interface SpinnerProps {
  size?: 'small' | 'large';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'small' }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color="#000" />
  </View>
);

Spinner.defaultProps = {
  size: 'small',
};

export default Spinner;

import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { styles } from './spinner.styles';
interface SpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'small', color }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

Spinner.defaultProps = {
  size: 'small',
  color: 'primary.500',
};

export default Spinner;

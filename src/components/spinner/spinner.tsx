import { useTheme } from 'native-base';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { styles } from './spinner.styles';
interface SpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'small', color }) => {
  const { colors } = useTheme();

  const [colorName, hue = '500'] = color?.split('.') ?? [];
  const spinnerColor = color && (colors as any)[colorName]?.[hue];

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={spinnerColor} />
    </View>
  );
};

Spinner.defaultProps = {
  size: 'small',
  color: 'primary.500',
};

export default Spinner;

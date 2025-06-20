import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

import { useDividerStyles } from './divider.styles';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation,
  thickness,
  color,
  style,
  testID,
  ...rest
}) => {
  const styles = useDividerStyles({
    orientation: orientation ?? 'horizontal',
    thickness: thickness ?? 1,
    color,
  });

  return <View testID={testID ?? 'divider'} style={[styles.divider, style]} {...rest} />;
};

Divider.defaultProps = {
  orientation: 'horizontal',
  thickness: 1,
  color: '#888888',
  testID: 'divider',
  style: null,
};

export default Divider;

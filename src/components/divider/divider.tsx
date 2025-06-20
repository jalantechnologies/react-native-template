import { useTheme } from 'native-base';
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

const getThemeColor = (theme: any, color?: string) => {
  if (!color) {
    return theme.colors.gray[400];
  }
  const [palette, shade] = color.split('.');
  return theme.colors?.[palette]?.[shade] || color;
};

const Divider: React.FC<DividerProps> = ({
  orientation,
  thickness,
  color,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();
  const resolvedColor = getThemeColor(theme, color);

  const styles = useDividerStyles({
    orientation: orientation ?? 'horizontal',
    thickness: thickness ?? 1,
    color: resolvedColor,
  });

  return <View testID={testID ?? 'divider'} style={[styles.divider, style]} {...rest} />;
};

Divider.defaultProps = {
  orientation: 'horizontal',
  thickness: 1,
  color: 'gray.400',
  style: undefined,
  testID: 'divider',
};

export default Divider;

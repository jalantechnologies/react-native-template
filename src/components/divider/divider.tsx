import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import { DividerOrientation, DividerDashStyle, useDividerStyles } from './divider.styles';

import { ALLOWED_DIVIDER_COLORS } from '@/app-theme';
import { useThemeColor } from '@/utils/use-theme-color.hook';

type AllowedColor = keyof typeof ALLOWED_DIVIDER_COLORS;
type AllowedShade = (typeof ALLOWED_DIVIDER_COLORS)[AllowedColor];

export interface DividerProps {
  orientation?: DividerOrientation;
  thickness?: number;
  style?: StyleProp<ViewStyle>;
  length?: number | string;
  dashStyle?: DividerDashStyle;
}

const Divider: React.FC<DividerProps> = ({
  orientation = DividerOrientation.Horizontal,
  thickness = 1,
  style,
  length,
  dashStyle = DividerDashStyle.Solid,
}) => {
  const color: AllowedColor = 'primary';
  const shade: AllowedShade = ALLOWED_DIVIDER_COLORS[color];

  const dividerColor = useThemeColor(`${color}.${shade}`);
  const styles = useDividerStyles({ orientation, thickness, length, dashStyle, dividerColor });

  return <View testID="divider" style={[styles.divider, style]} />;
};

Divider.defaultProps = {
  orientation: DividerOrientation.Horizontal,
  thickness: 1,
  style: undefined,
  length: undefined,
  dashStyle: DividerDashStyle.Solid,
};

export default Divider;

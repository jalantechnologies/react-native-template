import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

import { DividerOrientation, DividerDashStyle, useDividerStyles } from './divider.styles';

import { ICOLORHUES } from '@/app-theme';
import { useThemeColor } from '@/utils/use-theme-color.hook';

type ThemeColorKey = keyof typeof ICOLORHUES;

export interface DividerProps {
  orientation?: DividerOrientation;
  thickness?: number;
  color?: ThemeColorKey;
  style?: StyleProp<ViewStyle>;
  length?: number | string;
  dashStyle?: DividerDashStyle;
}

const Divider: React.FC<DividerProps> = ({
  orientation = DividerOrientation.Horizontal,
  thickness = 1,
  color = 'neutral',
  style,
  length,
  dashStyle = DividerDashStyle.Solid,
}) => {
  const dividerColor = useThemeColor(`${color}.200` as `${ThemeColorKey}.${string}`);
  const styles = useDividerStyles({ orientation, thickness, length, dashStyle, dividerColor });

  return <View testID="divider" style={[styles.divider, style]} />;
};

Divider.defaultProps = {
  orientation: DividerOrientation.Horizontal,
  thickness: 1,
  color: 'neutral',
  style: undefined,
  length: undefined,
  dashStyle: DividerDashStyle.Solid,
};

export default Divider;

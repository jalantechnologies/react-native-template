import { useTheme } from 'native-base';
import React from 'react';
import { View } from 'react-native';

import appTheme from '../../app-theme';

import { DividerOrientation, DividerDashStyle, useDividerStyles, Shade } from './divider.styles';

export interface DividerProps {
  color?: string;
  dashStyle?: DividerDashStyle;
  orientation?: DividerOrientation;
  shade?: Shade;
  testID?: string;
  thickness?: number;
}

const getDividerColor = (
  themeColors: typeof appTheme.colors,
  color?: string,
  shade?: Shade,
): string => {
  if (!color) {
    return '#E0E0E0';
  }

  const colorValue = themeColors[color as keyof typeof themeColors];

  if (typeof colorValue === 'object' && shade) {
    return (colorValue as Record<string, string>)[shade] || '#E0E0E0';
  }

  if (typeof colorValue === 'string') {
    return colorValue;
  }

  return '#E0E0E0';
};

const Divider: React.FC<DividerProps> = props => {
  const { color, dashStyle, orientation, shade, testID, thickness } = props;

  const theme = useTheme();
  const colors = theme.colors as typeof appTheme.colors;
  const dividerColor = getDividerColor(colors, color, shade);

  const styles = useDividerStyles({
    orientation: orientation ?? DividerOrientation.Horizontal,
    thickness: thickness ?? 1,
    dashStyle: dashStyle ?? DividerDashStyle.Solid,
    dividerColor,
  });

  return <View testID={testID} style={[styles.divider]} />;
};

Divider.defaultProps = {
  color: 'primary',
  dashStyle: DividerDashStyle.Solid,
  orientation: DividerOrientation.Horizontal,
  shade: '200',
  testID: 'divider',
  thickness: 1,
};

export default Divider;

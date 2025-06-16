import React from 'react';
import { View } from 'react-native';

import { useThemeColor } from '../../utils/use-theme-color.hook';

import { ALLOWED_DIVIDER_COLORS, AllowedColor, AllowedShade } from './divider.colors';
import { DividerOrientation, DividerDashStyle, useDividerStyles } from './divider.styles';

export interface DividerProps {
  orientation?: DividerOrientation;
  thickness?: number;
  length?: number | string;
  dashStyle?: DividerDashStyle;
  testID?: string;
}

const Divider: React.FC<DividerProps> = ({ orientation, thickness, length, dashStyle, testID }) => {
  const color: AllowedColor = 'primary';
  const shade: AllowedShade = ALLOWED_DIVIDER_COLORS[color];
  const dividerColor = useThemeColor(`${color}.${shade}`);

  const styles = useDividerStyles({
    orientation: orientation!,
    thickness: thickness!,
    length,
    dashStyle: dashStyle!,
    dividerColor,
  });

  return <View testID={testID ?? 'divider'} style={[styles.divider]} />;
};

Divider.defaultProps = {
  orientation: DividerOrientation.Horizontal,
  thickness: 1,
  length: undefined,
  dashStyle: DividerDashStyle.Solid,
  testID: 'divider',
};

export default Divider;

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

const Divider: React.FC<DividerProps> = ({
  color,
  dashStyle,
  orientation,
  shade,
  testID,
  thickness,
}) => {
  const theme = useTheme();
  const colors = theme.colors as typeof appTheme.colors;
  const dividerColor =
    color &&
    shade &&
    colors[color as keyof typeof colors] &&
    typeof colors[color as keyof typeof colors] === 'object'
      ? (colors[color as keyof typeof colors] as Record<string, string>)[shade]
      : colors.primary['200'];

  const styles = useDividerStyles({
    orientation: orientation ?? DividerOrientation.Horizontal,
    thickness: thickness ?? 1,
    dashStyle: dashStyle ?? DividerDashStyle.Solid,
    dividerColor,
  });

  return <View testID={testID ?? 'divider'} style={[styles.divider]} />;
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

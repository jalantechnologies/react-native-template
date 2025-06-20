import { StyleSheet, ViewStyle } from 'react-native';

import appTheme from '../../app-theme';

export type Shade = keyof (typeof appTheme.colors)['primary'];

export enum DividerOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum DividerDashStyle {
  Solid = 'solid',
  Dashed = 'dashed',
  Dotted = 'dotted',
}

interface DividerStyleProps {
  orientation: DividerOrientation;
  thickness: number;
  dashStyle: DividerDashStyle;
  dividerColor: string;
}

export const useDividerStyles = ({
  orientation,
  thickness,
  dashStyle,
  dividerColor,
}: DividerStyleProps) => {
  return StyleSheet.create({
    divider: {
      ...(orientation === DividerOrientation.Horizontal
        ? { width: '100%', height: thickness }
        : { height: '100%', width: thickness }),
      ...(dashStyle === DividerDashStyle.Solid
        ? { backgroundColor: dividerColor }
        : { borderStyle: dashStyle, borderWidth: thickness, borderColor: dividerColor }),
    } as ViewStyle,
  });
};

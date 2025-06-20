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
  const baseStyle: ViewStyle =
    orientation === DividerOrientation.Horizontal
      ? { width: '100%', height: thickness }
      : { height: '100%', width: thickness };

  if (dashStyle === DividerDashStyle.Solid) {
    baseStyle.backgroundColor = dividerColor;
  } else {
    baseStyle.borderStyle = dashStyle;
    baseStyle.borderWidth = thickness;
    baseStyle.borderColor = dividerColor;
    baseStyle.backgroundColor = undefined;
  }

  return StyleSheet.create({
    divider: baseStyle,
  });
};

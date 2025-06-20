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
  const isHorizontal = orientation === DividerOrientation.Horizontal;

  const baseStyle: ViewStyle = {
    width: isHorizontal ? '100%' : thickness,
    height: isHorizontal ? thickness : '100%',
  };

  if (dashStyle === DividerDashStyle.Solid) {
    baseStyle.backgroundColor = dividerColor;
  } else {
    baseStyle.borderStyle = dashStyle;
    baseStyle.borderColor = dividerColor;
    baseStyle.borderWidth = thickness;
  }

  return StyleSheet.create({
    divider: baseStyle,
  });
};

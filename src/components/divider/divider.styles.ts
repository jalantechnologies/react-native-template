import { useTheme } from 'native-base';
import { StyleSheet, ViewStyle } from 'react-native';

export enum DividerOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

interface DividerStyleProps {
  orientation: DividerOrientation;
  thickness: number;
}

export const useDividerStyles = ({ orientation, thickness }: DividerStyleProps) => {
  const theme = useTheme();
  const resolvedColor = theme.colors.gray[400];

  const isHorizontal = orientation === DividerOrientation.Horizontal;
  const style: ViewStyle = isHorizontal
    ? {
        width: '100%',
        height: thickness,
        backgroundColor: resolvedColor,
      }
    : {
        width: thickness,
        height: '100%',
        backgroundColor: resolvedColor,
      };

  return StyleSheet.create({
    divider: style,
  });
};

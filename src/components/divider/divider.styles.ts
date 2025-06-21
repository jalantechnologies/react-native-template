import { StyleSheet, ViewStyle } from 'react-native';

export type DividerOrientation = 'horizontal' | 'vertical';

interface DividerStyleProps {
  orientation: DividerOrientation;
  thickness: number;
  color?: string;
}

export const useDividerStyles = ({
  orientation,
  thickness,
  color = '#888888',
}: DividerStyleProps) => {
  const isHorizontal = orientation === 'horizontal';
  const style: ViewStyle = isHorizontal
    ? {
        width: '100%',
        height: thickness,
        backgroundColor: color,
      }
    : {
        width: thickness,
        height: '100%',
        backgroundColor: color,
      };

  return StyleSheet.create({
    divider: style,
  });
};

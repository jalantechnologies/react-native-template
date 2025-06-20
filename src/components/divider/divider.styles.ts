import { useTheme } from 'native-base';
import { StyleSheet, ViewStyle } from 'react-native';

export type DividerOrientation = 'horizontal' | 'vertical';

interface DividerStyleProps {
  orientation: DividerOrientation;
  thickness: number;
  color?: string;
}

export const useDividerStyles = ({ orientation, thickness, color }: DividerStyleProps) => {
  const theme = useTheme();
  const dividerColor = color || theme.colors?.gray?.[400] || '#888888';
  const isHorizontal = orientation === 'horizontal';
  const style: ViewStyle = isHorizontal
    ? {
        width: '100%',
        height: thickness,
        backgroundColor: dividerColor,
      }
    : {
        width: thickness,
        height: '100%',
        backgroundColor: dividerColor,
      };

  return StyleSheet.create({
    divider: style,
  });
};

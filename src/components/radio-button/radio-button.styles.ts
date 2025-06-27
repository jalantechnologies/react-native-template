import { useTheme } from 'native-base';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { RadioButtonKind, RadioButtonSize } from '../../types/radio-button';

interface RadioKindStyle {
  borderColor: string;
  innerColor: string;
}

export const useRadioKindStyles = (): Record<RadioButtonKind, RadioKindStyle> => {
  const theme = useTheme();

  return {
    [RadioButtonKind.PRIMARY]: {
      borderColor: theme.colors.primary['500'],
      innerColor: theme.colors.primary['500'],
    },
    [RadioButtonKind.SUCCESS]: {
      borderColor: theme.colors.success['500'],
      innerColor: theme.colors.success['500'],
    },
    [RadioButtonKind.ERROR]: {
      borderColor: theme.colors.danger['500'],
      innerColor: theme.colors.danger['500'],
    },
  };
};

export const useRadioStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    outerCircle: {
      borderRadius: theme.radii.full,
      borderWidth: parseInt(theme.borderWidths[1], 10),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.space[2],
    },
    innerCircle: {
      borderRadius: theme.radii.full,
    },
  });
};

export const useSizeStyles = () => {
  const theme = useTheme();
  return {
    [RadioButtonSize.SMALL]: StyleSheet.create({
      outerCircle: { height: theme.sizes[4], width: theme.sizes[4] },
      innerCircle: { height: theme.sizes[2], width: theme.sizes[2] },
      label: { fontSize: theme.fontSizes.sm },
    }),
    [RadioButtonSize.LARGE]: StyleSheet.create({
      outerCircle: { height: theme.sizes[5], width: theme.sizes[5] },
      innerCircle: { height: theme.sizes[2] + 2, width: theme.sizes[2] + 2 },
      label: { fontSize: theme.fontSizes.md },
    }),
  } as Record<RadioButtonSize, { outerCircle: ViewStyle; innerCircle: ViewStyle; label: TextStyle }>;
};
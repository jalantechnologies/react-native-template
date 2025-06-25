import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

import { RadioButtonKind } from '../../types/radio-button';

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

export const RadioStyles = (small: boolean) => {
  const theme = useTheme();
  return StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    outerCircle: {
      height: small ? theme.sizes[4] : theme.sizes[5],
      width: small ? theme.sizes[4] : theme.sizes[5],
      borderRadius: theme.radii.full,
      borderWidth: parseInt(theme.borderWidths[1], 10),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.space[2],
    },
    innerCircle: {
      height: small ? theme.sizes[2] : theme.sizes[2] + 2,
      width: small ? theme.sizes[2] : theme.sizes[2] + 2,
      borderRadius: theme.radii.full,
    },
    label: {
      fontSize: theme.fontSizes.md,
    },
  });
};

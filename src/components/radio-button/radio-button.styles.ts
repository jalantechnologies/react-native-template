import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

import { RadioButtonKind } from '../../types/radio-button';

type RadioKind = 'primary' | 'success' | 'error';

interface RadioKindStyle {
  borderColor: string;
  innerColor: string;
}

export const useRadioKindStyles = (): Record<RadioKind, RadioKindStyle> => {
  const theme = useTheme();

  return {
    [RadioButtonKind.PRIMARY]: {
      borderColor: theme.colors.primary['500'],
      innerColor: theme.colors.primary['600'],
    },
    [RadioButtonKind.SUCCESS]: {
      borderColor: theme.colors.success['500'],
      innerColor: theme.colors.success['600'],
    },
    [RadioButtonKind.ERROR]: {
      borderColor: theme.colors.danger['600'],
      innerColor: theme.colors.danger['500'],
    },
  };
};

export const RadioStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.space[3],
    },
    outerCircle: {
      height: theme.sizes[5],
      width: theme.sizes[5],
      borderRadius: theme.radii.full,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.space[2],
    },
    innerCircle: {
      height: theme.sizes[3],
      width: theme.sizes[3],
      borderRadius: theme.radii.full,
    },
    label: {
      fontSize: theme.fontSizes.md,
    },
  });
};

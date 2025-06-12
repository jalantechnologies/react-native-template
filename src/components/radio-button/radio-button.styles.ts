import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

import { RadioButtonKind } from './radio-button.types';

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

export const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 11,
    width: 11,
    borderRadius: 5.5,
  },
  label: {
    fontSize: 16,
  },
});

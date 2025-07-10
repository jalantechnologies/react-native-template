import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

import { CheckboxSize } from '../../types/checkbox';

export const useCheckboxStyles = (size: CheckboxSize) => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.space['2'],
    },
    checkboxBase: {
      width: size === CheckboxSize.SMALL ? theme.sizes['4'] : theme.sizes['5'],
      height: size === CheckboxSize.SMALL ? theme.sizes['4'] : theme.sizes['5'],
      borderRadius: theme.radii.sm,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      borderColor: theme.colors.secondary['400'],
      backgroundColor: theme.colors.white,
    },
    checkedBox: {
      backgroundColor: theme.colors.primary['500'],
      borderColor: theme.colors.primary['500'],
    },
    circle: {
      borderRadius: theme.radii.full,
    },
    focusedShadow: {
      ...theme.shadows['1'],
      shadowColor: theme.colors.secondary['400'],
    },
    disabledBox: {
      backgroundColor: theme.colors.secondary['200'],
      borderColor: theme.colors.secondary['200'],
    },
    disabledBorder: {
      borderColor: theme.colors.secondary['200'],
    },
    label: {
      fontSize: size === CheckboxSize.SMALL ? theme.fontSizes.sm : theme.fontSizes.lg,
      color: theme.colors.secondary['900'],
    },
    disabledLabel: {
      color: theme.colors.secondary['500'],
    },
  });
};

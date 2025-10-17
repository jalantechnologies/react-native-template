import { useTheme } from 'native-base';
import { StyleSheet, TextStyle } from 'react-native';

export const useInputStyles = () => {
  const theme = useTheme();

  const spacing = theme.space;
  const colors = theme.colors;

  return StyleSheet.create({
    wrapper: {
      gap: spacing[2],
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.radii.md,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
      minHeight: theme.sizes['12'],
    },
    input: {
      flex: 1,
      fontSize: theme.fontSizes.md,
      padding: spacing[0],
      margin: spacing[0],
    },
    enhancer: {
      marginHorizontal: spacing[1],
      justifyContent: 'center',
      alignItems: 'center',
    },
    defaultBorder: {
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      borderColor: colors.secondary[200],
    },
    disabledBackground: {
      backgroundColor: colors.secondary[50],
    },
    enabledBackground: {
      backgroundColor: colors.white,
    },
    disabled: {
      color: colors.secondary[600],
    },
    label: {
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      color: colors.secondary[900],
      fontSize: theme.fontSizes.sm,

      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: parseFloat(theme.letterSpacings.sm) * theme.fontSizes.sm,
    },
    focusedBorder: {
      borderColor: colors.primary[300],
    },
    errorMessage: {
      color: colors.danger[500],
      fontSize: theme.fontSizes.xs,
    },
    errorBorder: {
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      borderColor: colors.danger[500],
    },
    successBorder: {
      borderColor: colors.success[500],
      borderWidth: parseInt(theme.borderWidths['1'], 10),
    },
    successMessage: {
      color: colors.success[500],
      fontSize: theme.fontSizes.xs,
    },
  });
};

export const useTextAreaInputStyles = () => {
  const theme = useTheme();

  const spacing = theme.space;
  const colors = theme.colors;

  return StyleSheet.create({
    wrapper: {
      gap: spacing[2],
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.radii.md,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
    },
    input: {
      flex: 1,
      fontSize: theme.fontSizes.md,
      color: colors.secondary[900],
      padding: theme.space[0],
      margin: theme.space[0],
      minHeight: theme.sizes[20],
    },
    label: {
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      fontSize: theme.fontSizes.sm,
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: parseFloat(theme.letterSpacings.sm) * theme.fontSizes.sm,
    },
    enhancer: {
      marginHorizontal: spacing[1],
    },
    defaultBorder: {
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      borderColor: colors.secondary[200],
    },
    disabledBackground: {
      backgroundColor: colors.secondary[50],
    },
    enabledBackground: {
      backgroundColor: colors.white,
    },
    disabled: {
      color: colors.secondary[500],
    },
    focusedBorder: {
      borderColor: colors.primary[300],
    },
  });
};

export const useCardDetailsInputStyles = () => {
  const theme = useTheme();
  const colors = theme.colors;
  const spacing = theme.space;

  return StyleSheet.create({
    cardHolderInput: {
      borderColor: colors.secondary[200],
      borderRadius: theme.radii.md,
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      flex: 1,
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      lineHeight: Number(theme.lineHeights.sm),
      marginBottom: spacing[2],
      minHeight: theme.sizes['10'],
      paddingHorizontal: spacing[3],
    },
    cardInput: {
      borderRightWidth: theme.borderWidths[0],
      flex: 2,
    },
    container: {
      alignItems: 'center',
      borderRadius: theme.radii.md,
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      flexDirection: 'row',
      overflow: 'hidden',
      paddingHorizontal: spacing[3],
    },
    cvvInput: {
      textAlign: 'center',
    },
    expiryInput: {
      borderRightWidth: theme.borderWidths[0],
      textAlign: 'center',
    },
    inputField: {
      fontSize: theme.fontSizes.md,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      lineHeight: Number(theme.lineHeights.sm),
      minHeight: theme.sizes['10'],
      paddingHorizontal: spacing[2],
    },
    label: {
      fontSize: theme.fontSizes.sm,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      letterSpacing: parseFloat(theme.letterSpacings.sm) * theme.fontSizes.sm,
      lineHeight: Number(theme.lineHeights.sm),
    },
    message: {
      fontSize: theme.fontSizes.xs,
    },
    wrapper: {
      gap: spacing[2],
    },
  });
};

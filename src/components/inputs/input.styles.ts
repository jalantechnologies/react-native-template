import { useTheme } from 'native-base';
import { StyleSheet, TextStyle } from 'react-native';

export const useInputStyles = () => {
  const theme = useTheme();
  const {
    space: spacing,
    colors,
    fontSizes,
    lineHeights,
    letterSpacings,
    borderWidths,
    fontWeights,
    radii,
    sizes,
  } = theme;

  const borderWidth = parseInt(borderWidths['1'], 10);

  return StyleSheet.create({
    wrapper: {
      gap: spacing[2],
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: radii.md,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
      minHeight: sizes['12'],
    },
    input: {
      flex: 1,
      fontSize: fontSizes.md,
      padding: spacing[0],
      margin: spacing[0],
    },
    enhancer: {
      marginHorizontal: spacing[1],
      justifyContent: 'center',
      alignItems: 'center',
    },
    defaultBorder: {
      borderWidth,
      borderColor: colors.secondary[200],
    },
    focusedBorder: {
      borderColor: colors.primary[300],
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
      fontWeight: `${fontWeights.normal}` as TextStyle['fontWeight'],
      color: colors.secondary[900],
      fontSize: fontSizes.sm,
      lineHeight: Number(lineHeights.sm),
      letterSpacing: parseFloat(letterSpacings.sm) * fontSizes.sm,
    },
    errorBorder: {
      borderWidth,
      borderColor: colors.danger[500],
    },
    errorMessage: {
      color: colors.danger[500],
      fontSize: fontSizes.xs,
    },
    successBorder: {
      borderWidth,
      borderColor: colors.success[500],
    },
    successMessage: {
      color: colors.success[500],
      fontSize: fontSizes.xs,
    },
  });
};

// Text Area Styles
export const useTextAreaInputStyles = () => {
  const theme = useTheme();
  const {
    space: spacing,
    colors,
    fontSizes,
    lineHeights,
    letterSpacings,
    borderWidths,
    fontWeights,
    radii,
    sizes,
  } = theme;

  const borderWidth = parseInt(borderWidths['1'], 10);

  return StyleSheet.create({
    wrapper: {
      gap: spacing[2],
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: radii.md,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
    },
    input: {
      flex: 1,
      fontSize: fontSizes.md,
      color: colors.secondary[900],
      padding: spacing[0],
      margin: spacing[0],
      minHeight: sizes[20],
    },
    enhancer: {
      marginHorizontal: spacing[1],
    },
    label: {
      fontWeight: `${fontWeights.normal}` as TextStyle['fontWeight'],
      fontSize: fontSizes.sm,
      lineHeight: Number(lineHeights.sm),
      letterSpacing: parseFloat(letterSpacings.sm) * fontSizes.sm,
    },
    defaultBorder: {
      borderWidth,
      borderColor: colors.secondary[200],
    },
    focusedBorder: {
      borderColor: colors.primary[300],
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
  });
};

// Card Details Input Styles
export const useCardDetailsInputStyles = () => {
  const theme = useTheme();
  const {
    space: spacing,
    colors,
    fontSizes,
    lineHeights,
    letterSpacings,
    borderWidths,
    fontWeights,
    radii,
  } = theme;

  const borderWidth = parseInt(borderWidths['1'], 10);

  const baseInput = {
    fontWeight: `${fontWeights.normal}` as TextStyle['fontWeight'],
    fontSize: fontSizes.md,
    lineHeight: Number(lineHeights.sm),
    paddingHorizontal: spacing[2],
    color: colors.secondary[900],
  };

  return StyleSheet.create({
    wrapper: {
      gap: spacing[2],
    },
    label: {
      fontSize: fontSizes.sm,
      fontWeight: `${fontWeights.normal}` as TextStyle['fontWeight'],
      lineHeight: Number(lineHeights.sm),
      letterSpacing: parseFloat(letterSpacings.sm) * fontSizes.sm,
      color: colors.secondary[900],
    },
    container: {
      flexDirection: 'row',
      borderWidth,
      borderRadius: radii.md,
      overflow: 'hidden',
      alignItems: 'center',
      paddingHorizontal: spacing[3],
      backgroundColor: colors.white,
    },
    inputField: {
      ...baseInput,
    },
    cardHolderInput: {
      ...baseInput,
      borderWidth,
      borderRadius: radii.md,
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[3],
      marginBottom: spacing[2],
      backgroundColor: colors.white,
    },
    cardInput: {
      ...baseInput,
      flex: 2,
      borderRightWidth: 0,
      textAlign: 'left',
    },
    expiryInput: {
      ...baseInput,
      borderRightWidth: 0,
      textAlign: 'center',
    },
    cvvInput: {
      ...baseInput,
      textAlign: 'center',
    },
    message: {
      fontSize: fontSizes.xs,
    },
  });
};

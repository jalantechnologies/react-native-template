import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

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
      fontWeight: '500',
      color: colors.secondary[900],
      fontSize: theme.fontSizes.sm,
      fontFamily: 'Inter',
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: -0.02 * theme.fontSizes.sm,
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
      padding: 0,
      margin: 0,
      minHeight: theme.sizes[20],
    },
    label: {
      fontWeight: '500',
      fontSize: theme.fontSizes.sm,
      fontFamily: 'Inter',
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: -0.02 * theme.fontSizes.sm,
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

export const useDropdownInputStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    wrapper: {
      gap: theme.space[2],
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    },
    label: {
      fontWeight: '500',
      fontSize: theme.fontSizes.sm,
      fontFamily: 'Inter',
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: -0.02 * theme.fontSizes.sm,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.space[3],
      paddingVertical: theme.space[3],
      justifyContent: 'space-between',
    },
    inputText: {
      fontSize: theme.fontSizes.md,
    },
    errorMessage: {
      fontSize: theme.fontSizes.xs,
      color: theme.colors.danger[500],
    },
    successMessage: {
      fontSize: theme.fontSizes.xs,
      color: theme.colors.success[500],
    },
    option: {
      padding: theme.space[4],
      borderBottomWidth: parseInt(theme.borderWidths['1'], 10),
      borderBottomColor: theme.colors.secondary[200],
    },
    dropdown: {
      position: 'absolute',
      left: 0,
      right: 0,
      backgroundColor: theme.colors.white,
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      borderColor: theme.colors.secondary[200],
      borderRadius: theme.radii.md,
      zIndex: 1000,
    },
  });
};

export const useMobileInputStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    wrapper: {
      gap: theme.space[2],
    },
    label: {
      fontSize: theme.fontSizes.sm,
      fontWeight: '500',
      fontFamily: 'Inter',
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: -0.02 * theme.fontSizes.sm,
    },
    container: {
      flexDirection: 'row',
      borderWidth: 0,
      gap: theme.space[2],
    },
    dropdownContainer: {
      width: '20%',
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.space[2],
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      borderRadius: theme.radii.md,
    },
    text: {
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: theme.fontSizes.md,
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: -0.02 * theme.fontSizes.sm,
    },
    message: {
      fontSize: theme.fontSizes.xs,
    },
  });
};

export const useWebsiteInputStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    wrapper: {
      gap: theme.space[2],
    },
    label: {
      fontSize: theme.fontSizes.sm,
      fontWeight: '500',
      fontFamily: 'Inter',
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: -0.02 * theme.fontSizes.sm,
    },
    container: {
      flexDirection: 'row',
      borderWidth: 0,
    },
    protocolContainer: {
      width: theme.sizes[20],
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: theme.radii.md,
      borderBottomLeftRadius: theme.radii.md,
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      borderRightWidth: 0,
      borderColor: theme.colors.secondary[200],
      paddingHorizontal: theme.space[3],
      paddingVertical: theme.space[2],
    },
    text: {
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: theme.fontSizes.md,
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: -0.02 * theme.fontSizes.sm,
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.space[3],
      paddingVertical: theme.space[1],
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      borderTopRightRadius: theme.radii.md,
      borderBottomRightRadius: theme.radii.md,
    },
    message: {
      fontSize: theme.fontSizes.xs,
    },
  });
};

export const useCardDetailsInputStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    wrapper: {
      gap: theme.space[2],
    },
    label: {
      fontSize: theme.fontSizes.sm,
      fontWeight: '500',
      fontFamily: 'Inter',
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: -0.02 * theme.fontSizes.sm,
    },
    container: {
      flexDirection: 'row',
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      borderRadius: theme.radii.md,
      overflow: 'hidden',
      alignItems: 'center',
      paddingHorizontal: theme.space[3],
    },
    inputField: {
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: theme.fontSizes.md,
      lineHeight: Number(theme.lineHeights.sm),
      paddingHorizontal: theme.space[2],
    },
    cardInput: {
      flex: 2,
      borderRightWidth: 0,
    },
    expiryInput: {
      borderRightWidth: 0,
      textAlign: 'center',
    },
    cvvInput: {
      textAlign: 'center',
    },
    message: {
      fontSize: theme.fontSizes.xs,
    },
  });
};

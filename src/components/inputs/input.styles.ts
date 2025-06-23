import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const useInputStyles = () => {
  const theme = useTheme();

  const spacing = theme.space;
  const colors = theme.colors;

  return StyleSheet.create({
    wrapper: {
      gap: 8,
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
      color: colors.coolGray[800],
      padding: spacing[0],
      margin: spacing[0],
    },
    enhancer: {
      marginHorizontal: spacing[1],
      justifyContent: 'center',
      alignItems: 'center',
    },
    defaultBorder: {
      borderWidth: parseInt(theme.borderWidths['1']),
      borderColor: colors.secondary[200],
    },
    disabledBackground: {
      backgroundColor: colors.coolGray[100],
    },
    enabledBackground: {
      backgroundColor: colors.secondary[50],
    },
    disabled: {
      color: colors.coolGray[400],
    },
    label: {
      marginBottom: spacing[1],
      fontWeight: '500',
      color: colors.black,
      fontSize: theme.fontSizes.md,
      fontFamily: 'Inter',
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: -0.02 * theme.fontSizes.sm,
    },
    focusedBorder: {
      borderColor: colors.primary[300],
    },
    errorMessage: {
      color: colors.danger[500],
      fontSize: theme.fontSizes.sm,
    },
    errorBorder: {
      borderWidth: parseInt(theme.borderWidths['1']),
      borderColor: colors.danger[500],
    },
    successBorder: {
      borderColor: colors.success[500],
      borderWidth: parseInt(theme.borderWidths['1']),
    },
    successMessage: {
      color: colors.success[500],
      fontSize: theme.fontSizes.sm,
    },
  });
};

export const usePasswordInputStyles = () => {
  const theme = useTheme();

  const spacing = theme.space;
  const colors = theme.colors;

  return StyleSheet.create({
    label: {
      marginBottom: spacing[1],
      color: colors.coolGray[800],
      fontSize: theme.fontSizes.sm,
      fontWeight: '500',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'transparent',
      position: 'relative',
    },
    input: {
      flex: 1,
      height: 48,
      fontSize: theme.fontSizes.md,
      color: colors.coolGray[800],
    },
    iconButton: {
      padding: spacing[2],
      position: 'absolute',
      right: 8,
      top: '50%',
      transform: [{ translateY: -16 }],
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputError: {
      borderColor: colors.danger[600],
    },
    errorText: {
      color: colors.danger[600],
      fontSize: theme.fontSizes.xs,
      marginTop: spacing[1],
      marginLeft: spacing[1],
    },
  });
};

export const useTextAreaInputStyles = () => {
  const theme = useTheme();

  const spacing = theme.space;
  const colors = theme.colors;

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.radii.md,
      paddingHorizontal: spacing[3],
      paddingVertical: spacing[2],
      minHeight: 44,
      borderWidth: 1,
      borderColor: colors.coolGray[200],
    },
    input: {
      flex: 1,
      fontSize: theme.fontSizes.md,
      color: colors.coolGray[800],
      padding: 0,
      margin: 0,
      minHeight: 76,
    },
    label: {
      marginBottom: spacing[1],
      fontWeight: '500',
      color: colors.black,
      fontSize: theme.fontSizes.md,
      fontFamily: 'Inter',
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: -0.02 * theme.fontSizes.sm,
    },
    enhancer: {
      marginHorizontal: spacing[1],
    },
    defaultBorder: {
      borderWidth: 1,
      borderColor: colors.coolGray[200],
    },
    disabledBackground: {
      backgroundColor: colors.coolGray[100],
    },
    enabledBackground: {
      backgroundColor: 'transparent',
    },
    disabled: {
      color: colors.coolGray[400],
    },
    focusedBorder: {
      borderColor: colors.primary[300],
    },
  });
};

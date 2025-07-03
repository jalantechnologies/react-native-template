import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const useInputStyles = () => {
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
    },
    enhancer: {
      marginHorizontal: spacing[1],
      justifyContent: 'center',
      alignItems: 'center',
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

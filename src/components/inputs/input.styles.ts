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
      backgroundColor: colors.secondary[100],
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

export const useDropdownInputStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    },
    label: {
      marginBottom: theme.space[2],
      fontSize: theme.fontSizes.md,
      fontWeight: '500',
      color: theme.colors.black,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: parseInt(theme.borderWidths[1]),
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.space[3],
      paddingVertical: theme.space[3],
      justifyContent: 'space-between',
    },
    inputText: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.black,
    },
    dropdownIcon: {
      fontSize: theme.fontSizes.md,
      color: theme.colors.black,
    },
    errorMessage: {
      marginTop: theme.space[2],
      fontSize: theme.fontSizes.sm,
      color: theme.colors.danger[500],
    },
    successMessage: {
      marginTop: theme.space[2],
      fontSize: theme.fontSizes.sm,
      color: theme.colors.success[500],
    },
    option: {
      padding: theme.space[4],
      borderBottomWidth: parseInt(theme.borderWidths[1]),
      borderBottomColor: theme.colors.secondary[200],
    },
    dropdown: {
      position: 'absolute',
      left: 0,
      right: 0,
      backgroundColor: theme.colors.white,
      borderWidth: parseInt(theme.borderWidths[1]),
      borderColor: theme.colors.secondary[200],
      borderRadius: theme.radii.md,
      zIndex: 1000,
      maxHeight: theme.sizes[40],
    },
  });
};

export const useMobileInputStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    label: {
      marginBottom: theme.space[1],
      color: theme.colors.black,
    },
    container: {
      flexDirection: 'row',
      borderWidth: 0,
      gap: theme.space[2],
    },
    dropdownContainer: {
      width: theme.sizes[20],
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.space[2],
      borderWidth: parseInt(theme.borderWidths['1']),
      borderRadius: theme.radii.md,
    },
    inputField: {
      height: theme.sizes[10],
    },
    message: {
      fontSize: theme.fontSizes.sm,
      marginTop: theme.space[1],
    },
  });
};

export const useWebsiteInputStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    label: {
      marginBottom: theme.space[1],
      color: theme.colors.secondary[700],
      fontSize: theme.fontSizes.sm,
      fontWeight: '500',
    },
    container: {
      flexDirection: 'row',
      borderWidth: 0,
    },
    protocolContainer: {
      width: theme.sizes[20],
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.secondary[100],
      borderTopLeftRadius: theme.radii.md,
      borderBottomLeftRadius: theme.radii.md,
      borderWidth: parseInt(theme.borderWidths['1']),
      borderRightWidth: 0,
      borderColor: theme.colors.secondary[200],
    },
    protocolText: {
      fontSize: theme.fontSizes.sm,
      color: theme.colors.secondary[700],
    },
    inputContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.space[2],
      borderWidth: parseInt(theme.borderWidths['1']),
      borderTopRightRadius: theme.radii.md,
      borderBottomRightRadius: theme.radii.md,
    },
    inputField: {
      height: theme.sizes[10],
      fontSize: theme.fontSizes.sm,
    },
    message: {
      fontSize: theme.fontSizes.sm,
      marginTop: theme.space[1],
    },
  });
};

export const useCardDetailsInputStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    label: {
      fontSize: theme.space[4],
      color: theme.colors.black,
      marginBottom: theme.space[2],
    },
    container: {
      flexDirection: 'row',
      borderWidth: parseInt(theme.borderWidths['1']),
      borderRadius: theme.radii.md,
      overflow: 'hidden',
      alignItems: 'center',
      paddingHorizontal: theme.space[2],
    },
    inputField: {
      paddingVertical: theme.space[3],
      paddingHorizontal: theme.space[2],
      color: theme.colors.black,
    },
    cardInput: {
      flex: 2,
      borderRightWidth: 0,
      minWidth: theme.space[24],
    },
    expiryInput: {
      flex: 1,
      borderRightWidth: 0,
      textAlign: 'center',
    },
    cvvInput: {
      flex: 1,
      textAlign: 'center',
    },
  });
};

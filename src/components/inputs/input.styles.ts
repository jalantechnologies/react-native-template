import { useTheme } from 'native-base';
import { StyleSheet, TextStyle } from 'react-native';

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

export const useWebsiteInputStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    wrapper: {
      gap: theme.space[2],
    },
    label: {
      fontSize: theme.fontSizes.sm,
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: parseFloat(theme.letterSpacings.sm) * theme.fontSizes.sm,
    },
    container: {
      flexDirection: 'row',
      borderWidth: theme.borderWidths['0'],
    },
    protocolContainer: {
      width: theme.sizes[20],
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: theme.radii.md,
      borderBottomLeftRadius: theme.radii.md,
      borderWidth: parseInt(theme.borderWidths['1'], 10),
      borderRightWidth: theme.borderWidths['0'],
      borderColor: theme.colors.secondary[200],
      paddingHorizontal: theme.space[3],
      paddingVertical: theme.space[2],
    },
    text: {
      fontWeight: `${theme.fontWeights.normal}` as TextStyle['fontWeight'],
      fontSize: theme.fontSizes.md,
      lineHeight: Number(theme.lineHeights.sm),
      letterSpacing: parseFloat(theme.letterSpacings.sm) * theme.fontSizes.sm,
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

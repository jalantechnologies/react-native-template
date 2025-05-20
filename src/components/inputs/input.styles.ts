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
    errorBorder: {
      borderWidth: 1,
      borderColor: colors.danger[600],
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
    errorText: {
      color: colors.danger[600],
      fontSize: theme.fontSizes.xs,
      marginTop: spacing[1],
    },
  });
};

import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export const useFormControlStyles = () => {
  const theme = useTheme() as any;
  const spacing = theme.spacing;
  const colors = theme.colors;
  const fontSizes = theme.fonts?.fontSize;
  const roundness = theme.roundness;

  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: spacing.xs,
      marginBottom: spacing.sm,
      padding: spacing.sm,
    },
    label: {
      minHeight: 24,
      fontWeight: '500',
      color: colors.primary,
    },
    inputContainer: {
      position: 'relative',
      borderRadius: roundness,
    },
    error: {
      color: colors.errorContainer || colors.error,
      fontSize: fontSizes?.xs,
      fontWeight: '500',
      letterSpacing: 0.5,
      marginTop: spacing.xs,
    },
  });
};

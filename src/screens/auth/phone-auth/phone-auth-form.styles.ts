import { useTheme } from 'react-native-paper';

export const usePhoneAuthFormStyles = () => {
  const theme = useTheme();
  const radius = (theme as any).roundness;
  const spacing = (theme as any).spacing;

  return {
    container: {
      flex: 1,
      paddingBottom: spacing.md,
    },
    content: {
      gap: spacing.lg,
      flex: 1,
      marginBottom: spacing.lg,
    },
    row: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
      gap: spacing.sm,
      marginTop: spacing.sm,
    },
    countryAnchorButton: {
      borderColor: theme.colors.outline,
      flex: 1,
    },
    phoneInputWrapper: {
      flex: 3,
    },
    inputBox: {
      borderRadius: radius,
    },
    errorText: {
      color: theme.colors.error,
      marginTop: spacing.sm,
    },
    agreementRow: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
      gap: spacing.sm,
      marginTop: spacing.sm,
    },
    agreementText: {
      lineHeight: spacing.md,
    },
    privacyLink: {
      color: theme.colors.primary,
      textDecorationLine: (theme as any).textDecoration?.underline ?? 'underline',
    },
    menuScroll: {
      maxHeight: spacing.lg * 8,
    },
  };
};

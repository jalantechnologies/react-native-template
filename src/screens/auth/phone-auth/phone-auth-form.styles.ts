import { useTheme } from 'react-native-paper';

export const usePhoneAuthFormStyles = () => {
  const theme = useTheme();
  const radius = theme.roundness;

  return {
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    row: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
    },
    countryAnchorButton: {
      borderColor: theme.colors.outline,
      borderRadius: radius,
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
    },
    agreementRow: {
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
    },
    privacyLink: {
      color: theme.colors.primary,
      textDecorationLine: 'underline' as const,
    },
    menuScroll: {
      maxHeight: 192,
    },
  };
};

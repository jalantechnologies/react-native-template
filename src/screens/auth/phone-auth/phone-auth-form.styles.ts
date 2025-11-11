import { StyleSheet } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';

export const usePhoneAuthFormStyles = () => {
  const theme = useTheme();
  return createStyles(theme);
};

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    agreementRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    buttonContent: {
      justifyContent: 'flex-start',
    },
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    countryAnchorButton: {
      alignItems: 'center',
      borderColor: theme.colors.outline,
      borderRadius: theme.roundness,
      flex: 1,
      justifyContent: 'center',
      minHeight: theme.roundness * 12,
    },
    errorText: {
      color: theme.colors.error,
    },
    inputBox: {
      borderRadius: theme.roundness,
    },
    menuScroll: {
      maxHeight: theme.roundness * 48,
    },
    phoneInputWrapper: {
      flex: 3,
    },
    privacyLink: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
    },
  });

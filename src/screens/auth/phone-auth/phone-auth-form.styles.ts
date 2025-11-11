import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import type { AppTheme } from '../../../theme/app-theme';

export const usePhoneAuthFormStyles = () => {
  const theme = useTheme<AppTheme>();
  return createStyles(theme);
};

const createStyles = (theme: AppTheme) =>
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
      minHeight: theme.layout.buttonMinHeight,
    },
    errorText: {
      color: theme.colors.error,
    },
    inputBox: {
      borderRadius: theme.roundness,
    },
    menuScroll: {
      maxHeight: theme.layout.listMaxHeight,
    },
    phoneInputWrapper: {
      flex: 3,
      marginLeft: theme.spacing.xs,
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

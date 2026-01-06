import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import type { AppTheme } from '@/theme';
export const useOtpFormStyles = () => {
    const theme = useTheme<AppTheme>();
    return StyleSheet.create({
        containerOtp: {
            flexDirection: 'row',
            gap:theme.spacing.md,
            marginBottom:theme.spacing['2xl'],
        },
        input: {
            width: theme.spacing['7xl'],
            textAlign: 'center',
            backgroundColor:theme.colors.surface,
        },
        container: {
            flex: 1,
            justifyContent: 'space-between',
        },
        label: {
            color:theme.colors.primary,
            marginTop:theme.spacing['3xl'],
            marginBottom:theme.spacing.md,
        },
        resendRow: {
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',

        },
        resend: {
            color:theme.colors.primary,
        },
        resendDisabled: {
            opacity: 0.5,
        },
    });
};

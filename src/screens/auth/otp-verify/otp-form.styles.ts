import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const useOtpFormStyles = () => {
    const theme = useTheme();
    return StyleSheet.create({
        containerOtp: {
            flexDirection: 'row',
            gap:12,
            marginBottom:22,
        },
        input: {
            width: 68,
            textAlign: 'center',
            backgroundColor:theme.colors.surface,
        },
        container: {
            flex: 1,
            justifyContent: 'space-between',
        },
        label: {
            color:theme.colors.primary,
            marginTop:34,
            marginBottom:12,
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
        button: {
            borderRadius: 8,
        },
    });
};

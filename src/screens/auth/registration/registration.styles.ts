import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import type { AppTheme } from '@/theme';
export const useRegistrationStyles = () => {
    const theme = useTheme<AppTheme>();
    return StyleSheet.create({
        container: {
            gap: theme.spacing.lg,
        },
        header: {
            marginVertical: theme.spacing.md,

        },
        subtitle: {
            marginTop: theme.spacing.md,
            opacity: 0.7,
            marginBottom:theme.spacing.xl,
        },
        text: {
            color: theme.colors.primary,
            paddingBottom: theme.spacing.md,
            fontWeight:'600',
        },
        textBox:{
            backgroundColor:theme.colors.surface,
        },
    });
};

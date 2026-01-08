import { StyleSheet } from 'react-native';

import { useAppTheme } from '@/theme';
export const useRegistrationStyles = () => {
    const theme = useAppTheme();
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
        },
        textBox:{
            backgroundColor:theme.colors.surface,
        },
    });
};

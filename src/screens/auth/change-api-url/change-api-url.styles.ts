import { StyleSheet } from 'react-native';

import { useAppTheme } from '@/theme';

export const useChangeApiUrlStyles = () => {
    const theme = useAppTheme();
    return StyleSheet.create({
        button: {
            paddingHorizontal: theme.spacing.md,
            borderColor: theme.colors.primary,

        },
        text: {
            color: theme.colors.primary,
            marginBottom: theme.spacing.md,
        },
        ButtonSpacing: {
            flexDirection: 'row',
            gap: theme.spacing.md,
        },
        buttonContainer: {
            paddingTop: theme.spacing.xs,
        },
        inputTextBox: {
            backgroundColor: theme.colors.surface,
        },

    });
};

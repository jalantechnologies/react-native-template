import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import type { AppTheme } from '@/theme';

export const useEditProfileStyles = () => {
    const theme = useTheme<AppTheme>();

    return StyleSheet.create({
        layout: {
            gap: theme.spacing.xs,
        },
        text: {
            color: theme.colors.primary,
            marginBottom: theme.spacing.sm,
            fontWeight: '600',
        },
    });
};

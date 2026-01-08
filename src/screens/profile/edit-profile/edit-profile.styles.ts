import { StyleSheet } from 'react-native';

import { useAppTheme } from '@/theme';

export const useEditProfileStyles = () => {
    const theme = useAppTheme();

    return StyleSheet.create({
        layout: {
            gap: theme.spacing.xs,
        },
        text: {
            color: theme.colors.primary,
            marginBottom: theme.spacing.sm,
        },
        profileView :{
            flex: 1,
            justifyContent:'space-between',
        },

    });
};

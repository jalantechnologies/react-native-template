import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import type { AppTheme } from '@/theme';
export const ChangeApiUrlStyles = () => {
    const theme = useTheme<AppTheme>();
    return StyleSheet.create({
        button: {
            paddingHorizontal:theme.spacing.md,

        },
        text:{
            color:theme.colors.primary,
            marginBottom:10,
            fontWeight:'600',
        },
ButtonSpacing: {
  flexDirection: 'row',
  gap: theme.spacing.md,
},

    });
};

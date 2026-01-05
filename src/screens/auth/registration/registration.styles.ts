import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const useRegistrationStyles = () => {
    const theme = useTheme();
    return StyleSheet.create({
        container: {
            gap: 16,
        },
        header: {
            marginVertical: 10,

        },
        subtitle: {
            marginTop: 14,
            opacity: 0.7,
            marginBottom:20,
        },
        text: {
            color: theme.colors.primary,
            paddingBottom: 8,
            fontWeight:'600',
        },
        textBox:{
            backgroundColor:theme.colors.surface,
        },
    });
};

import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';


export const useStyles = () => {
    const theme = useTheme()

    return StyleSheet.create({
        layout: {
            gap: 4
        },
        text: {
            color: theme.colors.primary,
            marginBottom: 8,
            fontWeight: '600'
        },
        Button: {
            borderRadius: 6,
        }
    })
};

import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';


export const useStyles = () => {
    const theme = useTheme()

    return StyleSheet.create({

        profileLayout: {
            flex: 1,
            backgroundColor: theme.colors.surface,
            padding: 16
        },
    })
};

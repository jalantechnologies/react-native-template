import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const ChangeApiUrlStyles = () => {
    const theme = useTheme();
    return StyleSheet.create({
        button: {
            paddingHorizontal:12,

        },
        text:{
            color:theme.colors.primary,
            marginBottom:10,
            fontWeight:'600',
        },
    });
};

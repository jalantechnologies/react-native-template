import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const ChangeApiUrlStyles = () => {
    const theme = useTheme();
    return StyleSheet.create({
        close: {
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
        },

        dialog: {
            borderRadius: 8,
            backgroundColor: theme.colors.surface,
        },
        button: {
            borderRadius: 6,
            paddingHorizontal:12,

        },
        text:{
            color:theme.colors.primary,
            marginBottom:10,
            fontWeight:'600',
        },
        heading:{
            color:theme.colors.primary,
            textAlign:'center',
            marginBottom:43,
        },
        buttonSection:{
            justifyContent:'center',
            gap:24,
        },
    });
};

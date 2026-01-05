import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export const usePhoneAuthFormStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    phoneAuthScreen: {
      flex: 1,
      paddingBottom: 16,
    },

    Login: {
      flex: 1,
      marginBottom: 24,
      gap:6,
    },

    loginSpacing: {
      marginBottom: 32,
    },

    Checkbox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 16,
    },

    checkboxTextSpacing: {
      marginLeft: 12,
    },

    inputBox: {
      flex:3,
      justifyContent:'center',
    },

    errorStyle: {
      borderColor: theme.colors.error,
      borderWidth: 1,
    },

    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      marginTop: 4,
    },

    row: {
      gap:9,
      width:'100%',
      flexDirection:'row',
      marginTop:8,
    },
    text:{
      color:theme.colors.primary,
    },
    checkBox:{
      flexDirection:'row',
    },
    menu:{
        borderWidth: 1,
        borderColor: theme.colors.outline,
        paddingHorizontal: 8,
        justifyContent: 'center',
        borderRadius: 4,
        minHeight: 56,
    },
  });
};

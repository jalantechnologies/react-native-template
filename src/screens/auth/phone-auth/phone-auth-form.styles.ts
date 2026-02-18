import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export const usePhoneAuthFormStyles = () => {
  const theme = useTheme() as any;

  return StyleSheet.create({
    inputBox: {
      borderRadius: 4,
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
  });
};

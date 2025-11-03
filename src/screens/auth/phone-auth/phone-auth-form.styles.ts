import { useTheme } from 'react-native-paper';

export const usePhoneAuthFormStyles = () => {
  const theme = useTheme();
  const radius = (theme as any).roundness;

  return {
    inputBox: {
      borderRadius: radius,
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
  };
};

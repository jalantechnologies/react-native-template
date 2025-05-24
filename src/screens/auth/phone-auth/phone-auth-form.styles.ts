import { useTheme } from 'native-base';

export const usePhoneAuthFormStyles = () => {
  const { colors, radii } = useTheme();

  return {
    inputBox: {
      borderRadius: radii.md,
    },
    errorStyle: {
      borderColor: colors.danger[600],
      borderWidth: 1,
    },
    errorText: {
      color: colors.danger[600],
      fontSize: 14,
      marginTop: 4,
    },
  };
};

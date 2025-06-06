import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const useChangeApiUrlStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    fabContainer: {
      backgroundColor: colors.primary[100],
      borderWidth: 1,
      borderColor: colors.primary[300],
    },
    gearIcon: {
      color: colors.primary[700],
    },
  });
};

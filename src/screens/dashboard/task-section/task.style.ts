import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export const useTaskStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 8,
    },
  });
};

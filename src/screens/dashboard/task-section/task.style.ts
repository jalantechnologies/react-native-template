import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const useTaskStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: theme.space[4],
      marginTop: theme.space[8],
    },
  });
};

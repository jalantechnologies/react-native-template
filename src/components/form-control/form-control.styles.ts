import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const useFormControlStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: theme.space['3'],
      marginBottom: theme.space['4'],
    },
    label: {
      minHeight: 24,
      fontWeight: '500',
      color: theme.colors.primary['900'],
    },
    inputContainer: {
      position: 'relative',
    },
    error: {
      color: theme.colors.danger?.[600],
      fontSize: theme.fontSizes.xs,
      fontWeight: '500',
      letterSpacing: 0.5,
      marginTop: theme.space['1'],
    },
  });
};

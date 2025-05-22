import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const useFormControlStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      gap: theme.space['1'],
      marginBottom: theme.space['1'],
      padding: theme.space['1'],
    },
    label: {
      minHeight: 24,
      fontWeight: '500',
      color: theme.colors.primary['500'],
    },
    inputContainer: {
      position: 'relative',
      borderWidth: theme.radii.xs,
    },
    error: {
      color: theme.colors.danger['500'],
      fontSize: theme.fontSizes.xs,
      fontWeight: '500',
      letterSpacing: 0.5,
      marginTop: theme.space['0.5'],
    },
  });
};

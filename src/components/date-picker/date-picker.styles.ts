import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const DatePickerStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      marginVertical: theme.space['8'],
      marginHorizontal: theme.space['8'],
    },
    button: {
      paddingVertical: theme.space['3'],
      paddingHorizontal: theme.space['4'],
      backgroundColor: theme.colors.gray[100],
      borderRadius: theme.radii.sm,
      alignItems: 'center',
    },
    text: {
      fontSize: theme.fontSizes.md,
    },
  });
};

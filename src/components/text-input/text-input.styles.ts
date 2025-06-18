import { useTheme } from 'native-base';
import { Platform, StyleSheet } from 'react-native';

export const useTextInputStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    inputContainer: {
      width: '90%',
      alignSelf: 'center',
      marginVertical: theme.space[2],
    },
    input: {
      height: theme.sizes[12],
      borderColor: theme.colors.coolGray[300],
      borderWidth: parseInt(theme.borderWidths[1]),
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.space[3],
      fontSize: theme.fontSizes.md,
      backgroundColor: theme.colors.white,
      ...Platform.select({
        ios: {
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        android: {
          elevation: 2,
        },
      }),
    },
  });
};

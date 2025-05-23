import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const useTagStyles = () => {
  const { colors, space, radii, fontSizes } = useTheme();

  return StyleSheet.create({
    tag: {
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary['500'],
      paddingVertical: space['1'],
      paddingHorizontal: space['3'],
      borderRadius: radii.full,
    },
    text: {
      fontSize: fontSizes.lg,
      color: colors.secondary['100'],
    },
    filledTextColor: {
      color: colors.secondary['100'],
    },
    outlinedTextColor: {
      color: colors.primary['500'],
    },
    iconWrapper: {
      marginLeft: space['0.5'],
    },
    filled: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary['500'],
    },
  });
};

import { useColorMode, useTheme } from 'native-base';
import { Dimensions, DimensionValue, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BOX_SIZE = SCREEN_WIDTH * 0.15;

export const useAlertStyles = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const isLight = colorMode === 'light';

  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isLight ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.1)',
    },
    iconContainer: {
      position: 'absolute',
      top: -BOX_SIZE / 2,
      alignSelf: 'center',
      zIndex: 1,
    },
    container: {
      width: theme.sizes['4/5'] as DimensionValue,
      backgroundColor: theme.colors.white,
      borderRadius: theme.radii['3xl'],
      alignItems: 'center',
      paddingTop: theme.space[12],
      paddingBottom: theme.space[8],
      paddingHorizontal: theme.space[5],
    },
    unrotate: {
      transform: [{ rotate: '-45deg' }],
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconWrapper: {
      width: BOX_SIZE,
      height: BOX_SIZE,
      transform: [{ rotate: '45deg' }],
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radii.md,
      marginBottom: theme.space[5],
    },
    iconText: {
      fontSize: theme.fontSizes['3xl'],
      fontWeight: 'bold',
    },
    title: {
      marginBottom: theme.space[2],
      textAlign: 'center',
    },
    message: {
      textAlign: 'center',
      marginBottom: theme.space[5],
    },
    button: {
      borderRadius: theme.radii['2xl'],
    },
    buttonText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: theme.fontSizes.md,
      minWidth: theme.sizes[3],
    },
    closeIconContainer: {
      position: 'absolute',
      top: theme.space[3],
      right: theme.space[3],
      zIndex: 2,
    },
  });
};

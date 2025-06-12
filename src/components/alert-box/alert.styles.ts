import { useColorMode, useTheme } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const BOX_SIZE = SCREEN_WIDTH * 0.15;

export const AlertStyles = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();

  const isLight = colorMode === 'light';

  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isLight
        ? 'rgba(0, 0, 0, 0.6)' // dark backdrop in light mode
        : 'rgba(255, 255, 255, 0.1)',
    },
    iconContainer: {
      position: 'absolute',
      top: -BOX_SIZE / 2,
      alignSelf: 'center',
      zIndex: 1,
    },
    container: {
      width: '80%',
      backgroundColor: theme.colors.white,
      borderRadius: 20,
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 30,
      paddingHorizontal: 20,
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
      borderRadius: 12,
      marginBottom: 20,
    },
    iconText: {
      color: theme.colors.white,
      fontSize: 30,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme.colors.gray[900],
    },
    message: {
      textAlign: 'center',
      marginBottom: 20,
      fontSize: 16,
      color: theme.colors.gray[900],
    },
    button: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 25,
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
};

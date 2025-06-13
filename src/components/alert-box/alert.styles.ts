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
      backgroundColor: isLight ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.1)',
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
      borderRadius: theme.radii.lg,
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
      color: theme.colors.white,
      fontSize: theme.fontSizes['3xl'],
      fontWeight: 'bold',
    },
    title: {
      fontSize: theme.fontSizes.xl,
      fontWeight: 'bold',
      marginBottom: theme.space[2],
      color: theme.colors.gray[900],
      textAlign: 'center',
    },
    message: {
      textAlign: 'center',
      marginBottom: theme.space[5],
      fontSize: theme.fontSizes.md,
      color: theme.colors.gray[900],
    },
    button: {
      borderRadius: theme.radii.full,
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: 'bold',
      fontSize: theme.fontSizes.md,
      paddingHorizontal: theme.space[4],
      paddingVertical: theme.space[1],
    },
  });
};

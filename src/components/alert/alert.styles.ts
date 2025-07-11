import { useTheme } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const iconContSize = width * 0.12;

export const useAlertStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerContainer: {
      backgroundColor: theme.colors.white,
      width: '80%',
      borderRadius: theme.radii.xl,
      padding: theme.space[5],
      paddingTop: theme.space[2],
      alignItems: 'center',
    },
    bottomContainer: {
      backgroundColor: theme.colors.white,
      borderTopLeftRadius: theme.radii.xl,
      borderTopRightRadius: theme.radii.xl,
      paddingVertical: theme.space[2],
      paddingHorizontal: theme.space[4],
      alignItems: 'center',
      width: '100%',
    },
    childrenContainer: {
      paddingVertical: theme.space[3],
    },
    title: {
      paddingBottom: theme.space[2],
      alignItems: 'center',
    },
    message: {
      paddingBottom: theme.space[3],
      alignItems: 'center',
    },
    iconContainer: {
      width: iconContSize,
      height: iconContSize,
      borderRadius: theme.radii.lg,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButtonContainer: {
      alignSelf: 'flex-end',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingTop: theme.space[2],
    },
    buttonWrapper: {
      flex: 1,
    },
    buttonSpacing: {
      width: theme.space[3],
    },
    handleBar: {
      width: '30%',
      height: theme.sizes[1],
      borderRadius: theme.radii.xs,
      backgroundColor: theme.colors.secondary[200],
      marginBottom: theme.space[5],
    },
  });
};

import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const useModalStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      maxWidth: 400,
      borderRadius: theme.radii.md,
      padding: theme.space[2],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderWidth: 0,
      backgroundColor: theme.colors.white,
    },
    modalBody: {
      paddingVertical: theme.space[4],
      color: theme.colors.primary['500'],
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.space[1],
    },
    headerTitle: {
      fontSize: theme.fontSizes.lg,
      fontWeight: 'bold',
      color: theme.colors.primary['500'],
      flex: 1,
    },
    headerCloseButton: {
      padding: theme.space[2],
    },
    headerCloseText: {
      fontSize: theme.fontSizes['2xl'],
      color: theme.colors.darkText,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: theme.space[4],
    },
    button: {
      marginLeft: theme.space[3],
      paddingVertical: theme.space[2],
      paddingHorizontal: theme.space[4],
      borderRadius: theme.radii.sm,
      width: '50%',
    },
    disabledButton: {
      opacity: 0.5,
    },
    disabledText: {
      color: theme.colors.tertiary['500'],
    },
  });
};

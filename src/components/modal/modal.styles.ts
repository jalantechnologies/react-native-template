import { useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

export const useModalStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: theme.colors.primary['800'],
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      width: '90%',
      maxWidth: 400,
      backgroundColor: theme.colors.secondary['600'],
      borderRadius: theme.radii.md,
      padding: theme.space[6],
      shadowColor: theme.colors.tertiary['900'],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderWidth: 1,
      borderColor: theme.colors.tertiary['200'],
    },
    modalBody: {
      paddingVertical: theme.space[4],
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: theme.space[4],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.tertiary['200'],
    },
    headerTitle: {
      fontSize: theme.fontSizes.lg,
      fontWeight: 'bold',
      color: theme.colors.primary[900],
      flex: 1,
    },
    headerCloseButton: {
      padding: theme.space[2],
    },
    headerCloseText: {
      fontSize: theme.fontSizes['2xl'],
      color: theme.colors.secondary['900'],
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: theme.space[4],
      borderTopWidth: 1,
      borderColor: theme.colors.tertiary['900'],
    },
    button: {
      marginLeft: theme.space[3],
      paddingVertical: theme.space[2],
      paddingHorizontal: theme.space[4],
      borderRadius: theme.radii.sm,
    },
    cancelText: {
      color: theme.colors.secondary[900],
      fontWeight: '500',
      fontSize: theme.fontSizes.md,
    },
    confirmText: {
      color: theme.colors.primary[900],
      fontWeight: '600',
      fontSize: theme.fontSizes.md,
    },
    disabledButton: {
      opacity: 0.5,
    },
    disabledText: {
      color: theme.colors.tertiary[300],
    },
  });
};

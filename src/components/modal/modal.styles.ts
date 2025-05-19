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
      backgroundColor: theme.colors.secondary['200'],
      borderRadius: theme.radii.md,
      padding: theme.space[2],
      shadowColor: theme.colors.tertiary['100'],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      borderWidth: 1,
      borderColor: theme.colors.tertiary['200'],
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
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.secondary['900'],
    },
    headerTitle: {
      fontSize: theme.fontSizes.lg,
      fontWeight: 'bold',
      color: theme.colors.primary['600'],
      flex: 1,
    },
    headerCloseButton: {
      padding: theme.space[2],
    },
    headerCloseText: {
      fontSize: theme.fontSizes['2xl'],
      color: theme.colors.lightText['900'],
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: theme.space[4],
      borderTopWidth: 1,
      borderColor: theme.colors.secondary['900'],
    },
    button: {
      marginLeft: theme.space[3],
      paddingVertical: theme.space[2],
      paddingHorizontal: theme.space[4],
      borderRadius: theme.radii.sm,
    },
    cancelText: {
      color: theme.colors.secondary[500],
      fontWeight: '500',
      fontSize: theme.fontSizes.md,
    },
    confirmText: {
      color: theme.colors.primary[500],
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

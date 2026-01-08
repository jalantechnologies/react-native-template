import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useAppTheme } from '@/theme';

export const useTaskStyles = () => {
  const theme = useAppTheme();

  return useMemo(()=>
  StyleSheet.create({
    title:{
     color:theme.colors.onPrimaryContainer,
    },
    container: {
      flexDirection: 'row',
      gap: theme.spacing.lg,
      marginTop: theme.spacing['4xl'],
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
    },
    taskScreen:{
      flex: 1,
      padding: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
    },
    center:{
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
    },

  }),[theme]);


};

export const useTaskModalStyles = () => {
  const theme = useAppTheme();

  return useMemo(()=>
  StyleSheet.create({
    button: {
      paddingHorizontal: theme.spacing.sm,
    },
    deleteButton: {
      paddingHorizontal: theme.spacing.sm,
      borderColor: theme.colors.primary,
    },
    text:{
    color:theme.colors.primary,
    paddingBottom:theme.spacing.sm,
    },

  }),[theme]);



};

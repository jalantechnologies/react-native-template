import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import type { AppTheme } from '@/theme';
export const useTaskStyles = () => {
  const theme = useTheme<AppTheme>();

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
  const theme = useTheme<AppTheme>();

  return useMemo(()=>
  StyleSheet.create({
    button: {
      paddingHorizontal: theme.spacing.sm,
    },
    text:{
    color:theme.colors.primary,
    paddingBottom:theme.spacing.sm,
    },

  }),[theme]);



};

import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
export const useTaskStyles = () => {
  const theme = useTheme();

  return useMemo(()=>
  StyleSheet.create({
    title:{
     color:theme.colors.onPrimaryContainer,
    },
    container: {
      flexDirection: 'row',
      gap: 16,
      marginTop: 36,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    taskScreen:{
      flex: 1,
      padding: 8,
      backgroundColor: theme.colors.surface,
    },
    center:{
      alignItems: 'center',
      paddingVertical: 12,
    },

  }),[theme]);


};

export const useTaskModalStyles = () => {
  const theme = useTheme();

  return useMemo(()=>
  StyleSheet.create({
    button: {
      paddingHorizontal: 6,
    },
    text:{
    color:theme.colors.primary,
    paddingBottom:8,
    },

  }),[theme]);



};

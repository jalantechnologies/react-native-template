import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper'
import { useMemo } from 'react';
export const useTaskStyles = () => {
  const theme = useTheme ();

  return useMemo(()=>
  StyleSheet.create({
    title:{
     color:theme.colors.onPrimaryContainer
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
    button: {
      borderRadius: 6,
    },
    taskScreen:{
      flex: 1,
      padding: 8,
      backgroundColor: theme.colors.surface,
    },
    center:{
      alignItems: 'center',
      paddingVertical: 12,
    }

  }),[theme])
   
  
};


export const taskModalStyles = () => {
  const theme = useTheme ();

  return useMemo(()=>
  StyleSheet.create({
    dialog: {
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
    },
    feild: {
      rowGap: 1,
      padding: 8,
    },
    button: {
      borderRadius: 6,
      paddingHorizontal: 6
    },
    heading:{
      color:theme.colors.primary,
      textAlign:'center',
      paddingBottom:28
    },
    close: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  deleteFooter:{
    flexDirection:'row',
    gap:16,
    justifyContent:'center',
    width: '100%',
  },
  deleteText:{
    marginVertical:12,
    alignItems:'center'

  },
  box:{
    backgroundColor: theme.colors.surface,
    marginTop:6
  },
  text:{
    color:theme.colors.primary,
    paddingBottom:8
  }

  }),[theme])
  
  
  
}
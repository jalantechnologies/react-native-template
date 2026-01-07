import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import type { AppTheme } from '@/theme';
export const usePhoneAuthFormStyles = () => {
  const theme = useTheme<AppTheme>();

  return StyleSheet.create({
    phoneAuthScreen: {
      flex: 1,
      paddingBottom:theme.spacing.lg,
    },

    Login: {
      flex: 1,
      marginBottom:theme.spacing['2xl'],
      gap:theme.spacing.sm,
    },

    loginSpacing: {
      marginBottom: theme.spacing['3xl'],
    },

    Checkbox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: theme.spacing.lg,
    },

    checkboxTextSpacing: {
      marginLeft: theme.spacing.md,
    },

    inputBox: {
      flex:3,
      justifyContent:'center',
    },
    row: {
      gap:theme.spacing.sm,
      width:'100%',
      flexDirection:'row',
      marginTop:theme.spacing.md,
    },
    text:{
      color:theme.colors.primary,
    },
    checkBox:{
      flexDirection:'row',
    },
    menu:{
        borderWidth: 1,
        borderColor: theme.colors.outline,
        paddingHorizontal: theme.spacing.sm,
        justifyContent: 'center',
        borderRadius: theme.spacing.xs,
        minHeight:56,
    },
    checkBoxGap:{
      marginLeft:theme.spacing.md,
    },
    titleSpacing:{
      paddingBottom:theme.spacing['2xl'],
    },
  });
};

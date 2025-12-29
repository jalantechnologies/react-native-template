import { profile } from 'console';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';


export const useStyles = () => {
    const theme = useTheme()

    return StyleSheet.create({
        dialog: {
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
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
  profile:{
    borderRadius:"full",
    padding:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  avatar:{
    backgroundColor:theme.colors.secondaryContainer,

  },
  profileSpacing:{
    width:'100%',
    gap:4,
  },
  buttonSpacing:{
    width:'50%',
    alignSelf:'center',
    position:'absolute',
    bottom:10
  }

    })
};

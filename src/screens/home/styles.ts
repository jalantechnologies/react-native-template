import { makeStyles } from '@rneui/themed';
import { Dimensions } from 'react-native';

export const useStyles = makeStyles(theme => ({
  home: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: theme.colors.background,
  },
  switchModeBtn: {
    backgroundColor: theme.colors.tertiary,
    borderRadius: 5,
  },
  switchModeBtnContainer: {
    marginBottom: 20,
  },
  welcomeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
  },
  input: {
    height: 48,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    fontSize: 24,
    padding: 8,
    minWidth: 200,
  },
  spacer: {
    marginBottom: 20,
  },
  button: {
    width: 'auto',
    height: 'auto',
    borderRadius: 5,
  },
  fact: {
    display: 'flex',
    flexDirection: 'column',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    marginBottom: 20,
  },
  catFact: {
    fontSize: 18,
    marginBottom: 10,
  },
}));

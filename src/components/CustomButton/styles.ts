import { makeStyles } from '@rneui/themed';

export const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 10,
    borderRadius: 5,
    color: theme.colors.background,
  },
  button: {
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    minWidth: 100,
  },
}));

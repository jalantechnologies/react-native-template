import appTheme from 'boilerplate-react-native/src/app-theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  activityIndicator: {
    marginHorizontal: appTheme.space['1'],
  },
  button: {
    alignItems: 'center',
    borderRadius: appTheme.radii.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: appTheme.space['2'],
    justifyContent: 'center',
    minHeight: 40,
    width: '100%',
  },
  compact: {
    padding: appTheme.space['2'],
  },
  danger: {
    backgroundColor: appTheme.colors.danger[600],
    borderColor: appTheme.colors.danger[600],
  },
  default: {
    padding: appTheme.space['3'],
  },
  enhancer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 24,
  },
  horizontalStack: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: appTheme.space['2'],
  },
  large: {
    padding: appTheme.space['4'],
  },
  mini: {
    padding: appTheme.space['1'],
  },
  primary: {
    backgroundColor: appTheme.colors.primary,
    borderColor: appTheme.colors.primary,
  },
  secondary: {
    backgroundColor: appTheme.colors.secondary,
    borderColor: appTheme.colors.secondary,
  },
  tertiary: {
    backgroundColor: appTheme.colors.tertiary,
    borderColor: appTheme.colors.tertiary,
  },
});

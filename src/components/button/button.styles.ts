import appTheme from 'boilerplate-react-native/src/app-theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    borderWidth: 1,
    borderRadius: appTheme.radii?.md || 8,
    width: '100%',
    gap: appTheme.space?.['2'] || 8,
  },
  horizontalStack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: appTheme.space?.['2'] || 8,
  },
  enhancer: {
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    marginHorizontal: appTheme.space?.['1'] || 4,
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
  danger: {
    backgroundColor: appTheme.colors.danger?.[600] || '#dc3545',
    borderColor: appTheme.colors.danger?.[600] || '#dc3545',
  },
  compact: {
    padding: appTheme.space?.['2'] || 8,
  },
  default: {
    padding: appTheme.space?.['3'] || 10,
  },
  large: {
    padding: appTheme.space?.['4'] || 14,
  },
  mini: {
    padding: appTheme.space?.['1'] || 6,
  },
});

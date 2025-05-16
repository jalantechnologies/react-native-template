import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    gap: 8,
  },
  horizontalStack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  enhancer: {
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    marginHorizontal: 4,
  },
  primary: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  secondary: {
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
  },
  tertiary: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  danger: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
  },
  compact: {
    padding: 8,
  },
  default: {
    padding: 10,
  },
  large: {
    padding: 14,
  },
  mini: {
    padding: 6,
  },
});

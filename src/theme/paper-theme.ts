import { MD3LightTheme, MD3Theme } from 'react-native-paper';

const background = '#F6F2FF';
const primary = '#6A4DFF';
const primaryContainer = '#E5DEFF';
const surface = '#FFFFFF';
const textPrimary = '#1C1243';
const textSecondary = '#5E5680';

const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 12,
  colors: {
    ...MD3LightTheme.colors,
    background,
    inverseOnSurface: background,
    inverseSurface: textPrimary,
    onPrimary: '#FFFFFF',
    onSurface: textPrimary,
    onSurfaceVariant: textSecondary,
    outline: '#CFC4FF',
    primary,
    primaryContainer,
    secondary: '#8060FF',
    secondaryContainer: '#EDE8FF',
    surface,
    surfaceVariant: '#F2EBFF',
  },
  fonts: {
    ...MD3LightTheme.fonts,
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontSize: 16,
      fontWeight: '400',
      letterSpacing: 0.25,
      lineHeight: 24,
    },
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontSize: 14,
      fontWeight: '400',
      letterSpacing: 0.25,
      lineHeight: 20,
    },
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      fontSize: 32,
      fontWeight: '700',
      letterSpacing: 0,
      lineHeight: 38,
    },
    labelLarge: {
      ...MD3LightTheme.fonts.labelLarge,
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 0.1,
      lineHeight: 24,
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontSize: 24,
      fontWeight: '600',
      letterSpacing: 0,
      lineHeight: 30,
    },
  },
};

export default paperTheme;


import { MD3LightTheme, configureFonts } from 'react-native-paper';

const colors = { 
  primary: '#007AFF', 
  secondary: '#737373', 
  error: '#FF3B30',
  success: '#4BB543', 
  warning: '#FFA500', 
  info: '#2CB1BC', 

}; 
 

const customFonts = {
  headlineLarge: {
    fontSize: 28,
    fontWeight: '600' as const,
  },
  headlineMedium: {
    fontSize: 26,
    fontWeight: '600' as const,
  },
  titleLarge: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  titleMedium: {
    fontSize: 18,
    fontWeight: '500' as const,
  },
  bodyLarge: {
    fontSize: 20,
    fontWeight: '500' as const,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
  },
};

export const theme = { 
  ...MD3LightTheme, 
  colors: { 
    ...MD3LightTheme.colors, 
    primary: colors.primary, 
    secondary: colors.secondary, 
    error: colors.error,
    success: colors.success,
    warning: colors.warning,
    info: colors.info,
  }, 
  fonts: {
    ...MD3LightTheme.fonts,
    ...customFonts,
  },
}; 

export type AppTheme = typeof theme; 
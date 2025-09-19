import { DefaultTheme } from 'styled-components/native';

export const lightTheme: DefaultTheme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    primary: '#4f46e5',
    secondary: '#6b7280',
    muted: '#a3a3a3',
  },
  spacing: { s: 8, m: 16, l: 24 },
  fontSizes: { small: 12, medium: 16, large: 20 },
};

export const darkTheme: DefaultTheme = {
  colors: {
    background: '#121212',
    text: '#ffffff',
    primary: '#6366f1',
    secondary: '#9ca3af',
    muted: '#6b7280',
  },
  spacing: { s: 8, m: 16, l: 24 },
  fontSizes: { small: 12, medium: 16, large: 20 },
};

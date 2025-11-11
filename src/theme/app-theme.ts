import type { MD3Theme } from 'react-native-paper';
import { MD3LightTheme as DefaultMD3Theme } from 'react-native-paper';

export interface AppTheme extends MD3Theme {
  iconSizes: {
    medium: number;
  };
  layout: {
    buttonMinHeight: number;
    listMaxHeight: number;
  };
  overlay: {
    snackbarDuration: number;
    zIndex: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}

const baseSpacing = DefaultMD3Theme.roundness;

export const appPaperTheme: AppTheme = {
  ...DefaultMD3Theme,
  iconSizes: {
    medium: baseSpacing * 6,
  },
  layout: {
    buttonMinHeight: baseSpacing * 14,
    listMaxHeight: baseSpacing * 48,
  },
  overlay: {
    snackbarDuration: 3000,
    zIndex: baseSpacing * 250,
  },
  spacing: {
    xs: baseSpacing,
    sm: baseSpacing * 2,
    md: baseSpacing * 4,
    lg: baseSpacing * 6,
    xl: baseSpacing * 8,
    xxl: baseSpacing * 12,
  },
};



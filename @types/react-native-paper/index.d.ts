import 'react-native-paper';

declare module 'react-native-paper' {
  interface MD3Theme {
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
      '4xl': number;
      '5xl': number;
      '6xl': number;
    };
  }

  interface MD3Colors {
    success: string;
    onSuccess: string;
    successContainer: string;
    onSuccessContainer: string;

    warning: string;
    onWarning: string;
    warningContainer: string;
    onWarningContainer: string;

    info: string;
    onInfo: string;
    infoContainer: string;
    onInfoContainer: string;
  }
}

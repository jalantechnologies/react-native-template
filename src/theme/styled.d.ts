import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
      muted: string;
    };
    spacing: {
      s: number;
      m: number;
      l: number;
    };
    fontSizes: {
      small: number;
      medium: number;
      large: number;
    };
  }
}

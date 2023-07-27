// extending the theme can add any property and color
import '@rneui/themed';

declare module '@rneui/themed' {
  export interface Colors {
    tertiary: string;
  }
}

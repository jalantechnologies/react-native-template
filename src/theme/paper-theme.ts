import { MD3LightTheme, configureFonts, MD3Theme } from 'react-native-paper';

const FONT_FAMILY = 'Manrope';

const fontConfig = {
  bodyLarge: { fontFamily: FONT_FAMILY, fontSize: 16 },
  bodyMedium: { fontFamily: FONT_FAMILY, fontSize: 14 },
  bodySmall: { fontFamily: FONT_FAMILY, fontSize: 12 },
  displayMedium: { fontFamily: FONT_FAMILY, fontSize: 36 },
  labelLarge: { fontFamily: FONT_FAMILY, fontSize: 14 },
  labelMedium: { fontFamily: FONT_FAMILY, fontSize: 12 },
  labelSmall: { fontFamily: FONT_FAMILY, fontSize: 11 },
  titleLarge: { fontFamily: FONT_FAMILY, fontSize: 22 },
  titleMedium: { fontFamily: FONT_FAMILY, fontSize: 18 },
  titleSmall: { fontFamily: FONT_FAMILY, fontSize: 16 },
};

const paperTheme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 16,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2205E9',
    onPrimary: '#FFFFFF',
    primaryContainer: '#3916ED',
    background: '#2205E9',
    surface: '#FFFFFF',
    secondary: '#ECECFB',
    onSecondary: '#030213',
    outline: 'rgba(255,255,255,0.2)',
  },
  fonts: configureFonts({ config: fontConfig }),
};

export default paperTheme;


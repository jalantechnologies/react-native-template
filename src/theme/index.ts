import { MD3LightTheme, configureFonts } from 'react-native-paper';


const ICOLORHUES = {
  primary: {
    '50': '#E6F0FF',
    '100': '#CCE0FF',
    '200': '#99C2FF',
    '300': '#66A3FF',
    '400': '#3385FF',
    '500': '#007AFF',
    '600': '#0066CC',
    '700': '#0052A3',
    '800': '#00438C',
    '900': '#003D7A',
  },
  secondary: {
    '50': '#FAFAFA',
    '100': '#F5F5F5',
    '200': '#E5E5E5',
    '300': '#D4D4D4',
    '400': '#A3A3A3',
    '500': '#737373',
    '600': '#525252',
    '700': '#404040',
    '800': '#262626',
    '900': '#171717',
  },
  danger: {
    '50': '#FEECEC',
    '100': '#FFD6D6',
    '200': '#FFADAD',
    '300': '#FF8484',
    '400': '#FF5C5C',
    '500': '#FF3B30',
    '600': '#E2332B',
    '700': '#BF2A23',
    '800': '#991F1A',
    '900': '#731512',
  },
  warning: {
    '50': '#FFF8E6',
    '100': '#FFF0CC',
    '200': '#FFE199',
    '300': '#FFD166',
    '400': '#FFC233',
    '500': '#FFA500',
    '600': '#E59400',
    '700': '#CC8400',
    '800': '#B37300',
    '900': '#805100',
  },
  success: {
    '50': '#EAFBE9',
    '100': '#D2F6D1',
    '200': '#A7E9C4',
    '300': '#7CE268',
    '400': '#51D733',
    '500': '#4BB543',
    '600': '#38922F',
    '700': '#2B6E21',
    '800': '#1B4A14',
    '900': '#0C2607',
  },
  info: {
    '50': '#E0FCFF',
    '100': '#BEF8FD',
    '200': '#87EAF2',
    '300': '#54D1DB',
    '400': '#38BEC9',
    '500': '#2CB1BC',
    '600': '#14919B',
    '700': '#0E7C86',
    '800': '#0A6C74',
    '900': '#044E54',
  },
};


const fontConfig = {
  headlineLarge: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  headlineMedium: {
    fontSize: 26,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  titleLarge: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  titleMedium: {
    fontSize: 18,
    fontWeight: '500' as const,
    lineHeight: 22,
  },
  bodyLarge: {
    fontSize: 20,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: '500' as const,
    lineHeight: 20,
  },
};

export const theme = {
  ...MD3LightTheme,

  colors: {
    ...MD3LightTheme.colors,

    primary: ICOLORHUES.primary['500'],
    primaryContainer: ICOLORHUES.primary['100'],
    onPrimary: '#FFFFFF',
    onPrimaryContainer: ICOLORHUES.primary['900'],


    secondary: ICOLORHUES.secondary['500'],
    secondaryContainer: ICOLORHUES.secondary['200'],
    onSecondary: '#FFFFFF',
    onSecondaryContainer: ICOLORHUES.secondary['900'],


    error: ICOLORHUES.danger['500'],
    errorContainer: ICOLORHUES.danger['100'],
    onError: '#FFFFFF',
    onErrorContainer: ICOLORHUES.danger['900'],

    surface: '#FFFFFF',
    surfaceVariant: ICOLORHUES.secondary['50'],
    onSurface: ICOLORHUES.secondary['900'],
    onSurfaceVariant: ICOLORHUES.secondary['700'],
    outline: ICOLORHUES.secondary['200'],

    success: ICOLORHUES.success['500'],
    successContainer: ICOLORHUES.success['100'],
    onSuccess: '#FFFFFF',
    onSuccessContainer: ICOLORHUES.success['900'],

    warning: ICOLORHUES.warning['500'],
    warningContainer: ICOLORHUES.warning['100'],
    onWarning: '#000000',
    onWarningContainer: ICOLORHUES.warning['900'],

    info: ICOLORHUES.info['500'],
    infoContainer: ICOLORHUES.info['100'],
    onInfo: '#FFFFFF',
    onInfoContainer: ICOLORHUES.info['900'],
  },
  fonts: configureFonts({ config: fontConfig }),
  customColors: ICOLORHUES,
};


export type AppTheme = typeof theme;


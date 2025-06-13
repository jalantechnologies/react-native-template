import { extendTheme } from 'native-base';

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
  tertiary: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  background: {
    50: '#fff7fb',
    100: '#fce4ec',
    200: '#f8bbd0',
    300: '#f48fb1',
    400: '#f06292',
    500: '#ec407a',
    600: '#d81b60',
    700: '#ad1457',
    800: '#880e4f',
    900: '#560027',
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
    '50': '#FFFE86',
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
};

const appTheme = extendTheme({
  colors: {
    ...ICOLORHUES,
  },
  components: {
    Button: {
      baseStyle: {
        _text: {
          color: 'white',
        },
        _pressed: {
          opacity: 0.7,
        },
      },
      variants: {
        solid: {
          bg: 'primary.500',
        },
        subtle: {
          bg: 'background',
          _text: {
            color: 'coolGray.800',
          },
          _pressed: {
            bg: 'coolGray.200',
          },
        },
        danger: {
          bg: 'danger.600',
          _disabled: {
            bg: 'danger.200',
          },
          _pressed: {
            bg: 'danger.700',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        _focus: {
          borderColor: 'primary.500',
          backgroundColor: 'background',
        },
      },
      variants: {
        otp: {
          width: 10,
          height: 10,
          textAlign: 'center',
          borderBottomWidth: 2,
          borderRadius: 0,
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'coolGray.800',
      },
      sizes: {
        lg: {
          fontWeight: '600',
        },
        xs: {
          fontWeight: '500',
          color: 'coolGray.600',
        },
        '2xl': {
          color: 'white',
        },
      },
    },
    Icon: {
      defaultProps: {
        color: 'primary.500',
      },
    },
    Toast: {
      baseStyle: {
        _title: {
          textAlign: 'center',
        },
      },
    },
  },
});

export const ALLOWED_DIVIDER_COLORS = {
  primary: '200',
  secondary: '200',
  tertiary: '200',
  background: '200',
  danger: '200',
  warning: '200',
  success: '200',
} as const;

export default appTheme;

import { extendTheme } from 'native-base';

const ICOLORHUES = {
  primary: {
    50: '#ede9fe',
    100: '#ddd6fe',
    200: '#c4b5fd',
    300: '#a78bfa',
    400: '#8b5cf6',
    500: '#7c3aed',
    600: '#6d28d9',
    700: '#5b21b6',
    800: '#4c1d95',
    900: '#3c1a6e',
  },
  secondary: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
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
          bg: 'primary',
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
          borderColor: 'primary',
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
        color: 'primary',
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

export default appTheme;

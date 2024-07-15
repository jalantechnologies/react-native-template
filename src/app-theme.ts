import { extendTheme } from 'native-base';

const appTheme = extendTheme({
  colors: {
    primary: 'rgb(76,29,149)',
    secondary: 'rgb(102, 90, 111)',
    tertiary: 'rgb(128, 81, 88)',
    background: 'rgb(255, 251, 255)',
  },
  components: {
    Button: {
      defaultProps: {
        bg: 'primary',
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
  },
});

export default appTheme;

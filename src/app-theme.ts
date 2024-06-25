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
    },
  },
});

export default appTheme;

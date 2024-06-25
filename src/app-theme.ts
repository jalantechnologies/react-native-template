import { extendTheme } from 'native-base';

const appTheme = extendTheme({
  colors: {
    primary: '#4C1D95',
    secondary: 'rgb(102, 90, 111)',
    tertiary: 'rgb(128, 81, 88)',
    background: 'rgb(255, 251, 255)',
  },
  components: {
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

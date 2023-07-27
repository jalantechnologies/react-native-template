import { createTheme } from '@rneui/themed';

const appTheme = createTheme({
  // create styling for all the reusable components here
  lightColors: {
    primary: 'rgb(120, 69, 172)',
    secondary: 'rgb(102, 90, 111)',
    tertiary: 'rgb(128, 81, 88)',
    error: 'rgb(186, 26, 26)',
    background: 'rgb(255, 251, 255)',
  },
  darkColors: {
    primary: 'rgb(220, 184, 255)',
    secondary: 'rgb(208, 193, 218)',
    tertiary: 'rgb(243, 183, 190)',
    error: 'rgb(255, 180, 171)',
    background: 'rgb(29, 27, 30)',
  },
  mode: 'light',
  components: {
    Button: {
      raised: true,
      containerStyle: {
        marginTop: 10,
        borderRadius: 5,
      },
      buttonStyle: {
        borderRadius: 5,
      },
    },
    Input: {
      inputContainerStyle: {
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: 300,
      },
    },
  },
});

export default appTheme;

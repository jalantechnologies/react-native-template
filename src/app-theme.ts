import { createTheme } from '@rneui/themed';

const appTheme = createTheme({
  // create styling for all the reusable components here
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

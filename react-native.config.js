module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null, // Disable autolinking for iOS to manually manage font files and avoid duplication issues.
      },
    },
    // Disable Flipper autolinking so Podfile’s NO_FLIPPER flag can fully control Flipper inclusion
    ...(process.env.NO_FLIPPER === '1'
      ? { 'react-native-flipper': { platforms: { ios: null } } }
      : {}),
  },
};

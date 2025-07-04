module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null, // Disable autolinking for iOS to manually manage font files and avoid duplication issues.
      },
    },
    ...(process.env.NO_FLIPPER === '1'
      ? { 'react-native-flipper': { platforms: { ios: null } } }
      : {}),
  },
};

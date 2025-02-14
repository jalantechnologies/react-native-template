/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json', '.ts', '.tsx'],
        alias: {
          '@': './src',
          types: './@types',
        },
      },
    ],
    'inline-dotenv',
    'react-native-reanimated/plugin', // needs to be last
  ],
};

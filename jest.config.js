module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/jest.setup.js',
  ],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|@react-native-firebase)',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.jsx',
    '<rootDir>/src/app.jsx',
    '<rootDir>/src/components/**/*.tsx',
    '<rootDir>/src/app.tsx',
  ],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  testMatch: ['**/*.test.ts?(x)', '**/*.test.js?(x)'],
};

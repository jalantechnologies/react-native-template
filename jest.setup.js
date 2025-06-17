import 'whatwg-fetch';
import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@datadog/mobile-react-native');

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translation hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

// Provide mock implementations for Firebase App and Messaging modules to simulate Firebase behavior in tests
jest.mock('@react-native-firebase/app', () => ({
  getApp: jest.fn(() => ({
    name: '[DEFAULT]',
    options: {
      projectId: 'mock-project-id',
    },
  })),
  getApps: jest.fn(() => []),
  initializeApp: jest.fn(),
  onLog: jest.fn(),
  setLogLevel: jest.fn(),
}));

jest.mock('@react-native-firebase/messaging', () => ({
  getMessaging: jest.fn(() => ({
    getToken: jest.fn(() => Promise.resolve('mock-token')),
    deleteToken: jest.fn(() => Promise.resolve()),
    onMessage: jest.fn(() => jest.fn()),
    onNotificationOpenedApp: jest.fn(() => jest.fn()),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    requestPermission: jest.fn(() => Promise.resolve(1)), // 1 = authorized
    hasPermission: jest.fn(() => Promise.resolve(1)),
    subscribeToTopic: jest.fn(() => Promise.resolve()),
    unsubscribeFromTopic: jest.fn(() => Promise.resolve()),
    onTokenRefresh: jest.fn(() => jest.fn()),
    setBackgroundMessageHandler: jest.fn(),
  })),
  getToken: jest.fn(() => Promise.resolve('mock-token')),
  onMessage: jest.fn(() => jest.fn()),
  onNotificationOpenedApp: jest.fn(() => jest.fn()),
  getInitialNotification: jest.fn(() => Promise.resolve(null)),
  requestPermission: jest.fn(() => Promise.resolve(1)),
  hasPermission: jest.fn(() => Promise.resolve(1)),
  subscribeToTopic: jest.fn(() => Promise.resolve()),
  unsubscribeFromTopic: jest.fn(() => Promise.resolve()),
  onTokenRefresh: jest.fn(() => jest.fn()),
  setBackgroundMessageHandler: jest.fn(),
}));

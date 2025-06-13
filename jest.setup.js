import 'whatwg-fetch';
import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@datadog/mobile-react-native');

// Mock MMKV
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    getString: jest.fn().mockReturnValue(null),
    getNumber: jest.fn().mockReturnValue(0),
    getBoolean: jest.fn().mockReturnValue(false),
    contains: jest.fn().mockReturnValue(false),
    delete: jest.fn(),
    clearAll: jest.fn(),
    getAllKeys: jest.fn().mockReturnValue([]),
  })),
}));

// Mock react-native-config
jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {},
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
  useSafeAreaFrame: jest.fn(() => ({ x: 0, y: 0, width: 390, height: 844 })),
}));

// Mock react-native-gesture-handler components
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(component => component),
    Directions: {},
  };
});

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

// Comprehensive mocks for Firebase modules
jest.mock('@react-native-firebase/app', () => {
  const firebaseAppMock = {
    name: '[DEFAULT]',
    options: {
      projectId: 'test-project',
      apiKey: 'mock-api-key',
      appId: 'mock-app-id',
    },
  };

  return {
    __esModule: true,
    getApp: jest.fn(() => firebaseAppMock),
    getApps: jest.fn(() => [firebaseAppMock]),
    initializeApp: jest.fn(() => firebaseAppMock),
    deleteApp: jest.fn(),
    default: jest.fn(() => ({
      app: jest.fn(() => firebaseAppMock),
    })),
  };
});

jest.mock('@react-native-firebase/messaging', () => {
  const messagingMock = {
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('mock-token')),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    onNotificationOpenedApp: jest.fn(() => () => {}),
    onMessage: jest.fn(() => () => {}),
    setBackgroundMessageHandler: jest.fn(),
    onTokenRefresh: jest.fn(() => () => {}),
  };

  return {
    __esModule: true,
    default: jest.fn(() => messagingMock),
    getMessaging: jest.fn(() => messagingMock),
    getToken: jest.fn(() => Promise.resolve('mock-token')),
    onMessage: jest.fn(() => () => {}),
    onNotificationOpenedApp: jest.fn(() => () => {}),
    getInitialNotification: jest.fn(() => Promise.resolve(null)),
    setBackgroundMessageHandler: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    onTokenRefresh: jest.fn(() => () => {}),
    deleteToken: jest.fn(() => Promise.resolve()),
  };
});

// Mock services
jest.mock(
  './src/services/firebase-messageing.service',
  () => ({
    FirebaseMessagingService: jest.fn().mockImplementation(() => ({
      initialize: jest.fn().mockResolvedValue(() => {}),
      requestUserPermission: jest.fn().mockResolvedValue(true),
      setupBackgroundMessageHandler: jest.fn(),
      setupForegroundMessageHandler: jest.fn().mockReturnValue(() => {}),
      setupNotificationOpenedHandler: jest.fn(),
      setupInitialNotificationHandler: jest.fn(),
    })),
  }),
  { virtual: true },
);

jest.mock(
  './src/services/notification-service',
  () => ({
    NotificationService: jest.fn().mockImplementation(() => ({
      initialize: jest.fn().mockResolvedValue(),
      setupForegroundEventHandlers: jest.fn().mockReturnValue(() => {}),
      displayNotification: jest.fn().mockResolvedValue(),
      displayLocalNotification: jest.fn().mockResolvedValue(),
      scheduleNotification: jest.fn().mockResolvedValue(),
      cancelAllNotifications: jest.fn().mockResolvedValue(),
      cancelNotification: jest.fn().mockResolvedValue(),
      getBadgeCount: jest.fn().mockResolvedValue(0),
      setBadgeCount: jest.fn().mockResolvedValue(),
    })),
  }),
  { virtual: true },
);

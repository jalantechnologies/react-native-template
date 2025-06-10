import 'whatwg-fetch';
import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@datadog/mobile-react-native');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn().mockResolvedValue(null),
    setItem: jest.fn().mockResolvedValue(),
    removeItem: jest.fn().mockResolvedValue(),
    clear: jest.fn().mockResolvedValue(),
    getAllKeys: jest.fn().mockResolvedValue([]),
    multiGet: jest.fn().mockResolvedValue([]),
    multiSet: jest.fn().mockResolvedValue(),
    multiRemove: jest.fn().mockResolvedValue(),
  },
}));

// Mock MMKV
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    contains: jest.fn(),
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

jest.mock('@notifee/react-native', () => ({
  __esModule: true,
  default: {
    displayNotification: jest.fn(),
    createChannel: jest.fn(),
    requestPermission: jest.fn().mockResolvedValue({ authorizationStatus: 1 }),
    onForegroundEvent: jest.fn(),
    onBackgroundEvent: jest.fn(),
    cancelNotification: jest.fn(),
    cancelAllNotifications: jest.fn(),
    DEFAULT: {
      CHANNEL_ID: 'default',
      IMPORTANCE: {
        DEFAULT: 3,
        HIGH: 4,
        LOW: 2,
        MIN: 1,
        NONE: 0,
      },
    },
    AndroidImportance: {
      DEFAULT: 3,
      HIGH: 4,
      LOW: 2,
      MIN: 1,
      NONE: 0,
    },
    AuthorizationStatus: {
      AUTHORIZED: 1,
      DENIED: 0,
      NOT_DETERMINED: -1,
      PROVISIONAL: 2,
    },
  },
}));

// Mock React Native Firebase App
jest.mock('@react-native-firebase/app', () => ({
  getApp: jest.fn(() => ({
    name: '[DEFAULT]',
    options: {
      projectId: 'test-project',
    },
  })),
  getApps: jest.fn(() => []),
  initializeApp: jest.fn(),
  deleteApp: jest.fn(),
}));

// Mock React Native Firebase Messaging
jest.mock('@react-native-firebase/messaging', () => ({
  getMessaging: jest.fn(() => ({
    getToken: jest.fn().mockResolvedValue('mock-token'),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn().mockResolvedValue(null),
    requestPermission: jest.fn().mockResolvedValue(1),
    hasPermission: jest.fn().mockResolvedValue(1),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
  })),
  getToken: jest.fn().mockResolvedValue('mock-token'),
  onMessage: jest.fn(),
  onNotificationOpenedApp: jest.fn(),
  getInitialNotification: jest.fn().mockResolvedValue(null),
  requestPermission: jest.fn().mockResolvedValue(1),
  hasPermission: jest.fn().mockResolvedValue(1),
  subscribeToTopic: jest.fn(),
  unsubscribeFromTopic: jest.fn(),
  // Add missing functions
  setBackgroundMessageHandler: jest.fn(),
  onTokenRefresh: jest.fn(),
  deleteToken: jest.fn().mockResolvedValue(),
}));

// Only mock Firebase modules that are actually installed
// Remove auth and firestore mocks since they're not installed

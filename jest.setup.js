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

// Mock Notifee with virtual module
jest.mock(
  '@notifee/react-native',
  () => ({
    __esModule: true,
    default: {
      displayNotification: jest.fn().mockResolvedValue('mock-notification-id'),
      createChannel: jest.fn().mockResolvedValue('mock-channel-id'),
      requestPermission: jest.fn().mockResolvedValue({ authorizationStatus: 1 }),
      onForegroundEvent: jest.fn().mockReturnValue(() => {}),
      onBackgroundEvent: jest.fn().mockReturnValue(() => {}),
      cancelNotification: jest.fn().mockResolvedValue(),
      cancelAllNotifications: jest.fn().mockResolvedValue(),
      getBadgeCount: jest.fn().mockResolvedValue(0),
      setBadgeCount: jest.fn().mockResolvedValue(),
      createTriggerNotification: jest.fn().mockResolvedValue('mock-trigger-notification-id'),
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
    EventType: {
      DISMISSED: 0,
      PRESS: 1,
      ACTION_PRESS: 2,
      DELIVERED: 3,
      APP_BLOCKED: 4,
      CHANNEL_BLOCKED: 5,
      CHANNEL_GROUP_BLOCKED: 6,
      TRIGGER_NOTIFICATION_CREATED: 7,
      UNKNOWN: -1,
    },
    TriggerType: {
      TIMESTAMP: 0,
      INTERVAL: 1,
    },
  }),
  { virtual: true },
);

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

// Mock LocalStorageService
jest.mock(
  './src/utils/localstorage.service',
  () => ({
    LocalStorageService: {
      getFromStorage: jest.fn().mockReturnValue(null),
      setToStorage: jest.fn(),
      removeFromStorage: jest.fn(),
      clearStorage: jest.fn(),
    },
  }),
  { virtual: true },
);

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

// Mock hooks
jest.mock(
  './src/utils/use-notification-setup.hook',
  () => ({
    useNotificationSetup: jest.fn(),
  }),
  { virtual: true },
);

jest.mock(
  './src/utils/use-local-storage.hook',
  () => ({
    useLocalStorage: jest.fn(() => ({
      getFromStorage: jest.fn().mockReturnValue(null),
      setToStorage: jest.fn(),
      removeFromStorage: jest.fn(),
      clearStorage: jest.fn(),
    })),
  }),
  { virtual: true },
);

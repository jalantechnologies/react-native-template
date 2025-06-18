import RNConfig from 'react-native-config';

export default class Config {
  static ENVIRONMENT: string | undefined = RNConfig.ENVIRONMENT;
  static API_BASE_URL: string | undefined = RNConfig.API_BASE_URL;
  static DD_CLIENT_TOKEN: string | undefined = RNConfig.DD_CLIENT_TOKEN;
  static DD_ENVIRONMENT_NAME: string | undefined = RNConfig.DD_ENVIRONMENT_NAME;
  static DD_APPLICATION_ID: string | undefined = RNConfig.DD_APPLICATION_ID;
  static LOGGER: string | undefined = RNConfig.LOGGER;

  static FIREBASE_PROJECT_ID: string | undefined = RNConfig.FIREBASE_PROJECT_ID;
  static FIREBASE_APP_ID_ANDROID: string | undefined = RNConfig.FIREBASE_APP_ID_ANDROID;
  static FIREBASE_APP_ID_IOS: string | undefined = RNConfig.FIREBASE_APP_ID_IOS;
  static FIREBASE_API_KEY_ANDROID: string | undefined = RNConfig.FIREBASE_API_KEY_ANDROID;
  static FIREBASE_API_KEY_IOS: string | undefined = RNConfig.FIREBASE_API_KEY_IOS;
  static FIREBASE_MESSAGING_SENDER_ID: string | undefined = RNConfig.FIREBASE_MESSAGING_SENDER_ID;
  static FIREBASE_STORAGE_BUCKET: string | undefined = RNConfig.FIREBASE_STORAGE_BUCKET;
  static FIREBASE_AUTH_DOMAIN: string | undefined = RNConfig.FIREBASE_AUTH_DOMAIN;
  static FIREBASE_DATABASE_URL: string | undefined = RNConfig.FIREBASE_DATABASE_URL;
  static FIREBASE_PROJECT_NUMBER: string | undefined = RNConfig.FIREBASE_PROJECT_NUMBER;

  static PACKAGE_NAME: string | undefined = RNConfig.PACKAGE_NAME;
  static BUNDLE_ID: string | undefined = RNConfig.BUNDLE_ID;
}

import RNConfig from 'react-native-config';

export default class Config {
  static ENVIRONMENT: string | undefined = RNConfig.ENVIRONMENT;
  static API_BASE_URL: string | undefined = RNConfig.API_BASE_URL;
  static DD_CLIENT_TOKEN: string | undefined = RNConfig.DD_CLIENT_TOKEN;
  static DD_ENVIRONMENT_NAME: string | undefined = RNConfig.DD_ENVIRONMENT_NAME;
  static DD_APPLICATION_ID: string | undefined = RNConfig.DD_APPLICATION_ID;
  static LOGGER: string | undefined = RNConfig.LOGGER;

  static ANDROID_FIREBASE_PROJECT_ID = RNConfig.ANDROID_FIREBASE_PROJECT_ID;
  static ANDROID_FIREBASE_APP_ID = RNConfig.ANDROID_FIREBASE_APP_ID;
  static FIREBASE_APP_ID_IOS = RNConfig.FIREBASE_APP_ID_IOS;
  static ANDROID_FIREBASE_API_KEY = RNConfig.ANDROID_FIREBASE_API_KEY;
  static FIREBASE_API_KEY_IOS = RNConfig.FIREBASE_API_KEY_IOS;
  static ANDROID_FIREBASE_PROJECT_NUMBER = RNConfig.ANDROID_FIREBASE_PROJECT_NUMBER;
  static ANDROID_FIREBASE_APP_PACKAGE = RNConfig.ANDROID_FIREBASE_APP_PACKAGE;
  static IOS_FIREBASE_APP_PACKAGE = RNConfig.IOS_FIREBASE_APP_PACKAGE;

  static get FIREBASE_STORAGE_BUCKET(): string | undefined {
    const projectId = RNConfig.ANDROID_FIREBASE_PROJECT_ID;
    return projectId ? `${projectId}.appspot.com` : undefined;
  }

  static get FIREBASE_AUTH_DOMAIN(): string | undefined {
    const projectId = RNConfig.ANDROID_FIREBASE_PROJECT_ID;
    return projectId ? `${projectId}.firebaseapp.com` : undefined;
  }

  static get FIREBASE_DATABASE_URL(): string | undefined {
    const projectId = RNConfig.ANDROID_FIREBASE_PROJECT_ID;
    return projectId ? `https://${projectId}-default-rtdb.firebaseio.com` : undefined;
  }
}

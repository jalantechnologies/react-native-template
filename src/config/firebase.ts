import { Platform } from 'react-native';

import Config from '../config';

enum PlatformType {
  IOS = 'ios',
  ANDROID = 'android',
}

const isIOS = Platform.OS === PlatformType.IOS;

export const firebaseConfig = {
  projectId: Config.ANDROID_FIREBASE_PROJECT_ID,
  appId: isIOS ? Config.FIREBASE_APP_ID_IOS : Config.ANDROID_FIREBASE_APP_ID,
  apiKey: isIOS ? Config.FIREBASE_API_KEY_IOS : Config.ANDROID_FIREBASE_API_KEY,
  messagingSenderId: Config.ANDROID_FIREBASE_PROJECT_NUMBER,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
};

export const firebaseProjectNumber = Config.ANDROID_FIREBASE_PROJECT_NUMBER;

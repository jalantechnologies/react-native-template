import { Platform } from 'react-native';

import Config from '../config';
export const firebaseConfig = {
  projectId: Config.ANDROID_FIREBASE_PROJECT_ID,
  appId: Platform.OS === 'ios' ? Config.FIREBASE_APP_ID_IOS : Config.ANDROID_FIREBASE_APP_ID,
  apiKey: Platform.OS === 'ios' ? Config.FIREBASE_API_KEY_IOS : Config.ANDROID_FIREBASE_API_KEY,
  messagingSenderId: Config.ANDROID_FIREBASE_PROJECT_NUMBER,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
};

export const firebaseProjectNumber = Config.ANDROID_FIREBASE_PROJECT_NUMBER;

import { Platform } from 'react-native';

import Config from '../config';
export const firebaseConfig = {
  projectId: Config.FIREBASE_PROJECT_ID,
  appId: Platform.OS === 'ios' ? Config.FIREBASE_APP_ID_IOS : Config.FIREBASE_APP_ID_ANDROID,
  apiKey: Platform.OS === 'ios' ? Config.FIREBASE_API_KEY_IOS : Config.FIREBASE_API_KEY_ANDROID,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  databaseURL: Config.FIREBASE_DATABASE_URL,
};

export const firebaseProjectNumber = Config.FIREBASE_PROJECT_NUMBER;

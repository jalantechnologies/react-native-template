import { MMKV } from 'react-native-mmkv';

const localStorage = new MMKV();

export const getFromStorage = (key: string) => {
  return localStorage.getString(key);
};

export const setToStorage = (key: string, value: string) => {
  localStorage.set(key, value);
};

export const removeFromStorage = (key: string) => {
  localStorage.delete(key);
};

export const clearStorage = () => {
  localStorage.clearAll();
};

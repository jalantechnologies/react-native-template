import { MMKV } from 'react-native-mmkv';
import { useCallback } from 'react';

const localStorage = new MMKV();

export const useLocalStorage = () => {
  const getFromStorage = useCallback((key: string): string | null => {
    const value = localStorage.getString(key);
    return value ?? null;
  }, []);

  const setToStorage = useCallback((key: string, value: string): void => {
    localStorage.set(key, value);
  }, []);

  const removeFromStorage = useCallback((key: string): void => {
    localStorage.delete(key);
  }, []);

  const clearStorage = useCallback((): void => {
    localStorage.clearAll();
  }, []);

  return {
    getFromStorage,
    setToStorage,
    removeFromStorage,
    clearStorage,
  };
};

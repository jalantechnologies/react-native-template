import { useCallback } from 'react';

import { LocalStorageService } from './localstorage.service';

export const useLocalStorage = () => {
  const getFromStorage = useCallback((key: string): string | null => {
    const value = LocalStorageService.getFromStorage(key);
    return value ?? null;
  }, []);

  const setToStorage = useCallback((key: string, value: string): void => {
    LocalStorageService.setToStorage(key, value);
  }, []);

  const removeFromStorage = useCallback((key: string): void => {
    LocalStorageService.removeFromStorage(key);
  }, []);

  const clearStorage = useCallback((): void => {
    LocalStorageService.clearStorage();
  }, []);

  return {
    getFromStorage,
    setToStorage,
    removeFromStorage,
    clearStorage,
  };
};

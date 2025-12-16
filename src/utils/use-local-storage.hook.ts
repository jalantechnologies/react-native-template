import { useCallback } from 'react';

import { LocalStorageService } from './localstorage.service';

export const useLocalStorage = () => {
  const getFromStorage = useCallback(async (key: string): Promise<string | null> => {
    return LocalStorageService.getFromStorage(key);
  }, []);

  const setToStorage = useCallback(async (key: string, value: string): Promise<void> => {
    await LocalStorageService.setToStorage(key, value);
  }, []);

  const removeFromStorage = useCallback(async (key: string): Promise<void> => {
    await LocalStorageService.removeFromStorage(key);
  }, []);

  const clearStorage = useCallback(async (): Promise<void> => {
    await LocalStorageService.clearStorage();
  }, []);

  return {
    getFromStorage,
    setToStorage,
    removeFromStorage,
    clearStorage,
  };
};

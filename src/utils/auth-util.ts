import { AccessToken } from '../types';
import { getFromStorage, removeFromStorage, setToStorage } from './storage-util';

const ACCESS_TOKEN: string = 'access-token';

export const setAccessToken = (accessToken: AccessToken): void => {
  setToStorage(ACCESS_TOKEN, JSON.stringify(accessToken));
};

export const getAccessToken = (): AccessToken | null => {
  const token = getFromStorage(ACCESS_TOKEN);
  if (token) {
    return JSON.parse(token) as AccessToken;
  }
  return null;
};

export const clearAccessToken = (): void => {
  removeFromStorage(ACCESS_TOKEN);
};

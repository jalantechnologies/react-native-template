import React, {
  Context,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AuthOptions } from '../constants';
import { AuthService } from '../services';
import { PhoneNumber, AccessToken } from '../types';
import { useLocalStorage } from '../utils';

interface AuthContextInterface {
  getAccessToken: () => AccessToken;
  isAuthLoading: boolean;
  isSendOTPLoading: boolean;
  isUserAuthenticated: boolean;
  isVerifyOTPLoading: boolean;
  logout: () => void;
  sendOTP: (phoneNumber: PhoneNumber) => Promise<void>;
  verifyOTP: (otp: string, phoneNumber: PhoneNumber) => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const useAuthContext = (): AuthContextInterface =>
  useContext(AuthContext as Context<AuthContextInterface>);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const authService = useMemo(() => new AuthService(), []);

  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSendOTPLoading, setIsSendOTPLoading] = useState(false);
  const [isVerifyOTPLoading, setIsVerifyOTPLoading] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [cachedToken, setCachedToken] = useState<AccessToken | null>(null);

  const { getFromStorage, removeFromStorage, setToStorage } = useLocalStorage();

  // Load auth state on mount
  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const tokenStr = await getFromStorage(AuthOptions.AccessTokenStorageKey);
        if (tokenStr) {
          const token = JSON.parse(tokenStr) as AccessToken;
          setCachedToken(token);
          setIsUserAuthenticated(true);
        }
      } catch (error) {
        console.warn('Failed to load auth state:', error);
      } finally {
        setIsAuthLoading(false);
      }
    };
    loadAuthState();
  }, [getFromStorage]);

  const getAccessToken = useCallback((): AccessToken => {
    if (!cachedToken) {
      throw new Error('User is not authenticated');
    }
    return cachedToken;
  }, [cachedToken]);

  const setAccessToken = useCallback(async (token: AccessToken) => {
    await setToStorage(AuthOptions.AccessTokenStorageKey, JSON.stringify(token));
    setCachedToken(token);
  }, [setToStorage]);

  const clearAccessToken = useCallback(async (): Promise<void> => {
    await removeFromStorage(AuthOptions.AccessTokenStorageKey);
    setCachedToken(null);
  }, [removeFromStorage]);

  const logout = useCallback(() => {
    clearAccessToken();
    setIsUserAuthenticated(false);
  }, [clearAccessToken]);

  const sendOTP = useCallback(async (phoneNumber: PhoneNumber) => {
    setIsSendOTPLoading(true);
    const { error } = await authService.sendOTP(phoneNumber);
    if (error) {
      setIsSendOTPLoading(false);
      throw error;
    }
    setIsSendOTPLoading(false);
  }, [authService]);

  const verifyOTP = useCallback(async (otp: string, phoneNumber: PhoneNumber) => {
    setIsVerifyOTPLoading(true);
    const { data, error } = await authService.verifyOTP(otp, phoneNumber);

    if (data) {
      const token = new AccessToken({ ...data });
      await setAccessToken(token);
      setIsUserAuthenticated(true);
      setIsVerifyOTPLoading(false);
    } else {
      setIsVerifyOTPLoading(false);
      throw error;
    }
  }, [authService, setAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        getAccessToken,
        isAuthLoading,
        isSendOTPLoading,
        isUserAuthenticated,
        isVerifyOTPLoading,
        logout,
        sendOTP,
        verifyOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

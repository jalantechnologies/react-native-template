import React, {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { AuthOptions } from '../constants';
import { AuthService } from '../services';
import { PhoneNumber, AccessToken } from '../types';
import { useLocalStorage } from '../utils';

interface AuthContextInterface {
  getAccessToken: () => AccessToken;
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

  const [isSendOTPLoading, setIsSendOTPLoading] = useState(false);
  const [isVerifyOTPLoading, setIsVerifyOTPLoading] = useState(false);

  const { getFromStorage, removeFromStorage, setToStorage } = useLocalStorage();

  const getAccessToken = (): AccessToken => {
    const token = getFromStorage(AuthOptions.AccessTokenStorageKey) as string;
    return JSON.parse(token) as AccessToken;
  };

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!getAccessToken());

  const setAccessToken = (token: AccessToken) => {
    setToStorage(AuthOptions.AccessTokenStorageKey, JSON.stringify(token));
  };

  const clearAccessToken = (): void => {
    removeFromStorage(AuthOptions.AccessTokenStorageKey);
  };

  const logout = () => {
    clearAccessToken();
    setIsUserAuthenticated(false);
  };

  const sendOTP = async (phoneNumber: PhoneNumber) => {
    setIsSendOTPLoading(true);
    const { error } = await authService.sendOTP(phoneNumber);
    if (error) {
      setIsSendOTPLoading(false);
      throw error;
    }
    setIsSendOTPLoading(false);
  };

  const verifyOTP = async (otp: string, phoneNumber: PhoneNumber) => {
    setIsVerifyOTPLoading(true);
    const { data, error } = await authService.verifyOTP(otp, phoneNumber);

    if (data) {
      const token = new AccessToken({ ...data });
      setAccessToken(token);
      setIsUserAuthenticated(true);
      setIsVerifyOTPLoading(false);
    } else {
      setIsVerifyOTPLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getAccessToken,
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

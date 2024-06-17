import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { AuthService } from '../services';
import { AccessToken, ApiResponse, AsyncError, PhoneNumber } from '../types';

import useAsync from './async.hook';
import { clearAccessToken, getAccessToken, setAccessToken } from '../utils';

type AuthContextType = {
  isSendOTPLoading: boolean;
  isUserAuthenticated: boolean;
  isVerifyOTPLoading: boolean;
  logout: () => void;
  sendOTP: (phoneNumber: PhoneNumber) => Promise<void>;
  sendOTPError: AsyncError;
  verifyOTP: (phoneNumber: PhoneNumber, otp: string) => Promise<AccessToken>;
  verifyOTPError: AsyncError;
  verifyOTPResult: AccessToken;
};

const AuthContext = createContext<AuthContextType | null>(null);

const authService = new AuthService();

export const useAuthContext = (): AuthContextType =>
  useContext(AuthContext) as AuthContextType;

const sendOTPFn = async (
  phoneNumber: PhoneNumber,
): Promise<ApiResponse<void>> => authService.sendOTP(phoneNumber);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(
    !!getAccessToken(),
  );

  const verifyOTPFn = async (
    phoneNumber: PhoneNumber,
    otp: string,
  ): Promise<ApiResponse<AccessToken>> => {
    const result = await authService.verifyOTP(phoneNumber, otp);
    if (result.data) {
      setAccessToken(result.data);
      setIsUserAuthenticated(true);
    }
    return result;
  };

  const logoutFn = (): void => {
    clearAccessToken();
    setIsUserAuthenticated(false);
  };

  const {
    isLoading: isSendOTPLoading,
    error: sendOTPError,
    asyncCallback: sendOTP,
  } = useAsync(sendOTPFn);

  const {
    isLoading: isVerifyOTPLoading,
    error: verifyOTPError,
    result: verifyOTPResult,
    asyncCallback: verifyOTP,
  } = useAsync(verifyOTPFn);

  return (
    <AuthContext.Provider
      value={{
        isSendOTPLoading,
        isUserAuthenticated,
        isVerifyOTPLoading,
        logout: logoutFn,
        sendOTP,
        sendOTPError,
        verifyOTP,
        verifyOTPError,
        verifyOTPResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

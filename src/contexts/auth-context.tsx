import React, {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { AuthService } from '../services';
import { PhoneNumber } from '../types';
import { clearAccessToken, getAccessToken, setAccessToken } from '../utils';

interface AuthContextInterface {
  isSendOTPLoading: boolean;
  isUserAuthenticated: boolean;
  isVerifyOTPLoading: boolean;
  logout: () => void;
  sendOTP: (phoneNumber: PhoneNumber) => Promise<void>;
  verifyOTP: (data: { phoneNumber: PhoneNumber; otp: string }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const useAuthContext = (): AuthContextInterface =>
  useContext(AuthContext as Context<AuthContextInterface>);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const authService = useMemo(() => new AuthService(), []);

  const [isSendOTPLoading, setIsSendOTPLoading] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!getAccessToken());
  const [isVerifyOTPLoading, setIsVerifyOTPLoading] = useState(false);

  const logout = () => {
    clearAccessToken();
    setIsUserAuthenticated(false);
  };

  const sendOTP = async (phoneNumber: PhoneNumber) => {
    setIsSendOTPLoading(true);
    await authService.sendOTP(phoneNumber);
    setIsSendOTPLoading(false);
  };

  const verifyOTP = async ({ phoneNumber, otp }: { phoneNumber: PhoneNumber; otp: string }) => {
    setIsVerifyOTPLoading(true);
    const { data, error } = await authService.verifyOTP(phoneNumber, otp);

    if (data) {
      setAccessToken(data);
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

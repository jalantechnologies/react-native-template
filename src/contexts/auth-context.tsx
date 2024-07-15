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
  verifyOTP: (otp: string, phoneNumber: PhoneNumber) => Promise<void>;
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

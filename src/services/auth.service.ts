import { AccessToken, ApiResponse, PhoneNumber } from '../types';
import { APIService } from './api';

export class AuthService extends APIService {
  sendOTP = async (phoneNumber: PhoneNumber): Promise<ApiResponse<void>> => {
    return this.post<void>('/accounts', { phoneNumber });
  };

  verifyOTP = async (otp: string, phoneNumber: PhoneNumber): Promise<ApiResponse<AccessToken>> => {
    const data = { otpCode: otp, phoneNumber };
    return this.post<AccessToken>('/access-tokens', data);
  };
}

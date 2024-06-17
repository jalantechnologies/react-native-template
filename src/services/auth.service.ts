import { AccessToken, ApiResponse, PhoneNumber } from '../types';
import { APIService } from './api';

export class AuthService extends APIService {
  sendOTP = async (phoneNumber: PhoneNumber): Promise<ApiResponse<void>> =>
    this.post('/accounts', {
      phoneNumber,
    });

  verifyOTP = async (
    phoneNumber: PhoneNumber,
    otp: string,
  ): Promise<ApiResponse<AccessToken>> =>
    this.post('/access-tokens', {
      phoneNumber,
      otpCode: otp,
    });
}

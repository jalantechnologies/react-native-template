import { AccessToken, APIResponse, PhoneNumber } from '../types';
import { APIService } from './api-service';

export class AuthService extends APIService {
  sendOTP = async (phoneNumber: PhoneNumber): Promise<APIResponse> => {
    return this.post('/accounts', { phoneNumber });
  };

  verifyOTP = async (otp: string, phoneNumber: PhoneNumber): Promise<APIResponse> => {
    return this.post<AccessToken>('/access-tokens', {
      otpCode: otp,
      phoneNumber,
    });
  };
}

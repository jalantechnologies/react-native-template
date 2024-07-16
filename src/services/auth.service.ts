import { AccessToken, APIResponse, PhoneNumber } from '../types';
import { APIService } from './api-service';

export class AuthService extends APIService {
  sendOTP = async (phoneNumber: PhoneNumber): Promise<APIResponse<void>> => {
    return this.post<void>('/accounts', { phoneNumber });
  };

  verifyOTP = async (otp: string, phoneNumber: PhoneNumber): Promise<APIResponse<AccessToken>> => {
    const data = { otpCode: otp, phoneNumber };
    return this.post<AccessToken>('/access-tokens', data);
  };
}

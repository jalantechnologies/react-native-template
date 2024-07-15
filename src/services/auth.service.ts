import { AccessToken, ApiResponse, PhoneNumber } from '../types';
import { ApiError } from '../types/api-response';
import { APIService } from './api';

export class AuthService extends APIService {
  sendOTP = async (phoneNumber: PhoneNumber): Promise<ApiResponse<void>> =>
    this.post('/accounts', {
      phoneNumber,
    });

  verifyOTP = async (phoneNumber: PhoneNumber, otp: string): Promise<ApiResponse<AccessToken>> => {
    try {
      const response = await this.post('/access-tokens', {
        phoneNumber,
        otpCode: otp,
      });

      return new ApiResponse<AccessToken>(new AccessToken(response.data));
    } catch (error) {
      return new ApiResponse<AccessToken>(undefined, new ApiError(error.response.data));
    }
  };
}

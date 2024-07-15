import { AccessToken, ApiResponse, PhoneNumber } from '../types';
import { ApiError } from '../types/api-response';
import { APIService } from './api';

export class AuthService extends APIService {
  sendOTP = async (phoneNumber: PhoneNumber): Promise<ApiResponse<void>> => {
    try {
      await this.post('/accounts', { phoneNumber });
      return new ApiResponse<void>(undefined);
    } catch (error) {
      return new ApiResponse<void>(undefined, new ApiError(error.response.data));
    }
  };

  verifyOTP = async (otp: string, phoneNumber: PhoneNumber): Promise<ApiResponse<AccessToken>> => {
    try {
      const response = await this.post('/access-tokens', {
        otpCode: otp,
        phoneNumber,
      });

      return new ApiResponse<AccessToken>(new AccessToken(response.data));
    } catch (error) {
      return new ApiResponse<AccessToken>(undefined, new ApiError(error.response.data));
    }
  };
}

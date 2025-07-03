import { AccessToken, APIResponse, PhoneNumber } from '../types';

import { APIService } from './api-service';

export class AuthService extends APIService {
  sendOTP = async (phoneNumber: PhoneNumber): Promise<APIResponse> => {
    try {
      const payload = {
        phone_number: {
          country_code: phoneNumber.countryCode.startsWith('+')
            ? phoneNumber.countryCode
            : `+${phoneNumber.countryCode}`,
          phone_number: phoneNumber.phoneNumber,
        },
      };

      console.log('SendOTP payload:', payload);
      return this.post('/accounts', payload);
    } catch (error) {
      console.error('SendOTP service error:', error);
      throw error;
    }
  };

  verifyOTP = async (otp: string, phoneNumber: PhoneNumber): Promise<APIResponse> => {
    try {
      const payload = {
        phone_number: {
          country_code: phoneNumber.countryCode.startsWith('+')
            ? phoneNumber.countryCode
            : `+${phoneNumber.countryCode}`,
          phone_number: phoneNumber.phoneNumber,
        },
        otp_code: otp,
      };

      console.log('VerifyOTP payload:', payload);
      return this.post<AccessToken>('/access-tokens', payload);
    } catch (error) {
      console.error('VerifyOTP service error:', error);
      throw error;
    }
  };
}

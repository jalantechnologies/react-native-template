import { AccessToken, APIResponse, PhoneNumber } from '../types';

import { APIService } from './api-service';

export class AuthService extends APIService {
  sendOTP = async (phoneNumber: PhoneNumber): Promise<APIResponse> => {
    return this.post('/accounts', {
      phone_number: {
        country_code: phoneNumber.countryCode,
        phone_number: phoneNumber.phoneNumber,
      },
    });
  };

  verifyOTP = async (otp: string, phoneNumber: PhoneNumber): Promise<APIResponse> => {
    return this.post<AccessToken>('/access-tokens', {
      otp_code: otp,
      phone_number: {
        country_code: phoneNumber.countryCode,
        phone_number: phoneNumber.phoneNumber,
      },
    });
  };
}

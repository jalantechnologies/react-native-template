import logger from '../logger/logger';
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

      return this.post('/accounts', payload);
    } catch (error) {
      logger.error(`SendOTP service error: ${error}`);
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

      return this.post<AccessToken>('/access-tokens', payload);
    } catch (error) {
      logger.error(`VerifyOTP service error: ${error}`);
      throw error;
    }
  };
}

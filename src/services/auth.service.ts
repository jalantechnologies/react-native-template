import logger from '../logger/logger';
import { AccessToken, APIResponse, PhoneNumber } from '../types';

import { APIService } from './api-service';

export class AuthService extends APIService {
  sendOTP = async (phoneNumber: PhoneNumber): Promise<APIResponse> => {
    try {
      const payload = {
        phone_number: {
          country_code: phoneNumber.countryCode,
          phone_number: phoneNumber.phoneNumber,
        },
      };

      const response = await this.post('/accounts', payload);
      return typeof response === 'string' ? JSON.parse(response) : response;
    } catch (error) {
      logger.error(`SendOTP service error: ${error}`);
      throw error;
    }
  };

  verifyOTP = async (otp: string, phoneNumber: PhoneNumber): Promise<APIResponse> => {
    try {
      const payload = {
        phone_number: {
          country_code: phoneNumber.countryCode,
          phone_number: phoneNumber.phoneNumber,
        },
        otp_code: otp,
      };

      const response = await this.post<AccessToken>('/access-tokens', payload);
      return typeof response === 'string' ? JSON.parse(response) : response;
    } catch (error) {
      logger.error(`VerifyOTP service error: ${error}`);
      throw error;
    }
  };
}

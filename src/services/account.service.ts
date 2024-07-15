import { AccessToken, ApiResponse } from '../types';
import { Account } from '../types/account';
import { ApiError } from '../types/api-response';
import { APIService } from './api';

export class AccountService extends APIService {
  getAccountDetails = async (userAccessToken: AccessToken): Promise<ApiResponse<Account>> => {
    try {
      const response = await this.get(`/accounts/${userAccessToken.accountId}`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      return new ApiResponse<Account>(new Account(response.data));
    } catch (error) {
      return new ApiResponse<Account>(undefined, new ApiError(error.response.data));
    }
  };

  updateAccountDetails = async (
    firstName: string,
    lastName: string,
    userAccessToken: AccessToken,
  ): Promise<ApiResponse<Account>> => {
    try {
      const response = await this.patch(`/accounts/${userAccessToken.accountId}`, {
        firstName,
        lastName,
      });
      return new ApiResponse<Account>(new Account(response.data));
    } catch (error) {
      return new ApiResponse<Account>(undefined, new ApiError(error.response.data));
    }
  };
}

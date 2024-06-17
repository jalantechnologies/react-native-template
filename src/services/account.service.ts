import { AccessToken, ApiResponse } from '../types';
import { Account } from '../types/account';
import { getAccessToken } from '../utils';
import { APIService } from './api';

export default class AccountService extends APIService {
  getAccountDetails = async (): Promise<ApiResponse<Account>> => {
    const userAccessToken = getAccessToken() as AccessToken;

    return this.get(`/accounts/${userAccessToken.accountId}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
    });
  };

  updateAccountDetails = async (
    firstName: string,
    lastName: string,
  ): Promise<ApiResponse<Account>> => {
    const userAccessToken = getAccessToken() as AccessToken;

    return this.patch(`/accounts/${userAccessToken.accountId}`, {
      firstName,
      lastName,
    });
  };
}

import { AccessToken, ApiResponse } from '../types';
import { Account } from '../types/account';
import { APIService } from './api';

export class AccountService extends APIService {
  getAccountDetails = async (userAccessToken: AccessToken): Promise<ApiResponse<Account>> => {
    return this.get<Account>(`/accounts/${userAccessToken.accountId}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
    });
  };

  updateAccountDetails = async (
    firstName: string,
    lastName: string,
    userAccessToken: AccessToken,
  ): Promise<ApiResponse<Account>> => {
    const data = { firstName, lastName };
    return this.patch<Account>(`/accounts/${userAccessToken.accountId}`, data);
  };
}

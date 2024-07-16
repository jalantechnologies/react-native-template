import { Account, AccessToken, APIResponse } from '../types';
import { APIService } from './api-service';

export class AccountService extends APIService {
  getAccount = async (userAccessToken: AccessToken): Promise<APIResponse<Account>> => {
    return this.get<Account>(`/accounts/${userAccessToken.accountId}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
    });
  };

  updateAccount = async (
    firstName: string,
    lastName: string,
    userAccessToken: AccessToken,
  ): Promise<APIResponse<Account>> => {
    const data = { firstName, lastName };
    return this.patch<Account>(`/accounts/${userAccessToken.accountId}`, data);
  };
}

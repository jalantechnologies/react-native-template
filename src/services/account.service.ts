import { AccessToken, APIResponse } from '../types';

import { APIService } from './api-service';

export class AccountService extends APIService {
  getAccount = async (userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.get(
      `/accounts/${userAccessToken.accountId}`,
      this.getAuthorizationHeader(userAccessToken.token),
    );
  };

  updateAccount = async (
    firstName: string,
    lastName: string,
    userAccessToken: AccessToken,
  ): Promise<APIResponse> => {
    const payload = {
      first_name: firstName,
      last_name: lastName,
    };

    const response = await this.patch(
      `/accounts/${userAccessToken.accountId}`,
      payload,
      this.getAuthorizationHeader(userAccessToken.token),
    );

    return response;
  };

  deleteAccount = async (userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.delete(`/accounts/${userAccessToken.accountId}`);
  };
}

import { AccessToken, APIResponse, Account, APIError } from '../types';

import { APIService } from './api-service';

export class AccountService extends APIService {
  getAccount = async (
    userAccessToken: AccessToken,
  ): Promise<{ data?: Account; error?: APIError }> => {
    const response = await this.get(
      `/accounts/${userAccessToken.accountId}`,
      this.getAuthorizationHeader(userAccessToken.token),
    );

    if (response.data) {
      return {
        data: new Account({ ...response.data }),
        error: response.error,
      };
    }

    return { error: response.error };
  };

  updateAccount = async (
    firstName: string,
    lastName: string,
    userAccessToken: AccessToken,
  ): Promise<{ data?: Account; error?: APIError }> => {
    const response = await this.patch(
      `/accounts/${userAccessToken.accountId}`,
      {
        first_name: firstName,
        last_name: lastName,
      },
      this.getAuthorizationHeader(userAccessToken.token),
    );

    if (response.data) {
      return {
        data: new Account({ ...response.data }),
        error: response.error,
      };
    }

    return { error: response.error };
  };

  deleteAccount = async (userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.delete(
      `/accounts/${userAccessToken.accountId}`,
      this.getAuthorizationHeader(userAccessToken.token),
    );
  };
}

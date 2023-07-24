import { APIService, ServiceResponse } from '../api';

export class AccountService extends APIService {
  constructor() {
    super();
  }

  async getFacts(): Promise<ServiceResponse<any>> {
    try {
      const { data: res } = await this.get('');
      return new ServiceResponse<any>(res);
    } catch (e) {
      return new ServiceResponse<any>(undefined, e.message);
    }
  }
}

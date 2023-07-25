import { APIService, ServiceResponse } from '../api';

export class AccountService extends APIService {
  constructor() {
    super();
  }
  static readonly FACTS = '/fact';

  async getCatFacts(): Promise<ServiceResponse<any>> {
    try {
      const { data } = await this.get(AccountService.FACTS);
      return new ServiceResponse<any>(data);
    } catch (e) {
      return new ServiceResponse<any>(undefined, e.message);
    }
  }
}

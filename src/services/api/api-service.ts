import * as _ from 'lodash';
import Config from 'react-native-config';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

export class APIService {
  service: AxiosInstance;
  environment: string;

  constructor() {
    this.service = axios.create({
      baseURL: Config.API_BASE_URL,
    });
    this.environment = Config.ENVIRONMENT;

    this.service.interceptors.response.use(
      (response): AxiosResponse => response,
      (error): Promise<AxiosError> => Promise.reject(error),
    );
  }

  isE2EEnv(): boolean {
    return this.environment === 'e2e';
  }

  protected static parseError(response: AxiosResponse): string {
    return _.get(response, 'response.data.error', '');
  }

  protected async get(path: string): Promise<AxiosResponse> {
    return this.service.get(path);
  }

  protected async post(path: string, payload: any): Promise<AxiosResponse> {
    return this.service.post(path, payload);
  }

  protected async put(path: string, payload: any): Promise<AxiosResponse> {
    return this.service.put(path, payload);
  }

  protected async patch(path: string, payload: any): Promise<AxiosResponse> {
    return this.service.patch(path, payload);
  }

  protected async delete(path: string, payload: any): Promise<AxiosResponse> {
    return this.service.delete(path, payload);
  }
}

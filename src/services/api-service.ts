import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import * as _ from 'lodash';
import Config from 'react-native-config';

import { APIResponse, APIError } from '../types';

export class APIService {
  service: AxiosInstance;
  environment: string | undefined;

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

  protected async request<T>(
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> {
    try {
      const response = await this.service.request({
        method,
        url: path,
        data,
        ...config,
      });
      return new APIResponse<T>(response.data);
    } catch (error: any) {
      return new APIResponse<T>(undefined, new APIError(error.response.data));
    }
  }

  protected async get<T>(path: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('get', path, undefined, config);
  }

  protected async post<T>(path: string, payload: any): Promise<APIResponse<T>> {
    return this.request<T>('post', path, payload);
  }

  protected async patch<T>(path: string, payload: any): Promise<APIResponse<T>> {
    return this.request<T>('patch', path, payload);
  }

  protected async put<T>(path: string, payload: any): Promise<APIResponse<T>> {
    return this.request<T>('put', path, payload);
  }

  protected async delete<T>(path: string, payload: any): Promise<APIResponse<T>> {
    return this.request<T>('delete', path, payload);
  }
}

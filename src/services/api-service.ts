import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import Config from 'react-native-config';

import { APIResponse, APIError } from '../types';
import { LocalStorageService } from '../utils';

export class APIService {
  service: AxiosInstance;
  environment: string | undefined;

  constructor() {
    this.environment = Config.ENVIRONMENT;

    let apiBaseUrl = Config.API_BASE_URL as string;

    if (this.environment !== 'production') {
      apiBaseUrl = LocalStorageService.getFromStorage('apiBaseUrl') || apiBaseUrl;
    }

    this.service = axios.create({
      baseURL: apiBaseUrl,
    });

    this.service.interceptors.response.use(
      (response): AxiosResponse => response,
      (error): Promise<AxiosError> => Promise.reject(error),
    );
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

  protected async post<T>(
    path: string,
    payload?: any,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> {
    return this.request<T>('post', path, payload, config);
  }

  protected async patch<T>(
    path: string,
    payload?: any,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> {
    return this.request<T>('patch', path, payload, config);
  }

  protected async put<T>(
    path: string,
    payload?: any,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> {
    return this.request<T>('put', path, payload, config);
  }

  protected async delete<T>(path: string, config?: AxiosRequestConfig): Promise<APIResponse<T>> {
    return this.request<T>('delete', path, undefined, config);
  }

  protected getAuthorizationHeader(accessToken: string): AxiosRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }
}

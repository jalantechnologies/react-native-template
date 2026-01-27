import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

import { APIResponse, APIError } from '../types';

export class APIService {
  service: AxiosInstance;
  environment: string | undefined;

  constructor() {
    this.environment = Config.ENVIRONMENT;

    const apiBaseUrl = Config.API_BASE_URL as string;

    if (!apiBaseUrl) {
      throw new Error('API_BASE_URL is not set. Please check your ENVFILE or .env configuration.');
    }

    const isPreviewHost = apiBaseUrl.includes('preview.flask-react-template.platform.bettrhq.com');
    const isProdHost =
      apiBaseUrl.includes('flask-react-template.platform.bettrhq.com') && !isPreviewHost;

    this.service = axios.create({
      baseURL: apiBaseUrl,
      timeout: 15000, // avoid indefinite spinner on stalled networks
    });

    // Tag requests so server logs show which app build hit them
    this.service.interceptors.request.use(config => {
      const headers = config.headers ?? {};
      headers['x-client-env'] = this.environment ?? 'unknown';
      config.headers = headers;
      return config;
    });

    this.service.interceptors.response.use(
      (response): AxiosResponse => response,
      (error): Promise<AxiosError> => Promise.reject(error),
    );

    console.info(
      `[APIService] initialized with baseURL=${apiBaseUrl} env=${this.environment ?? 'unknown'}`,
    );

    if (this.environment === 'production' && !isProdHost) {
      console.warn(
        `[APIService] production build is not pointing at production host (${apiBaseUrl}); check ENVFILE`,
      );
    }

    if (this.environment?.toLowerCase().includes('preview') && !isPreviewHost) {
      console.warn(
        `[APIService] preview build is not pointing at preview host (${apiBaseUrl}); check ENVFILE`,
      );
    }
  }

  protected async request<T>(
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    path: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<APIResponse<T>> {
    try {
      // Runtime override from "Change Base API URL" modal (AsyncStorage)
      const storedBaseUrl = await AsyncStorage.getItem('apiBaseUrl');
      if (storedBaseUrl && this.service.defaults.baseURL !== storedBaseUrl) {
        console.info(
          `[APIService] overriding baseURL from storage: ${this.service.defaults.baseURL} -> ${storedBaseUrl}`,
        );
        this.service.defaults.baseURL = storedBaseUrl;
      }

      const response = await this.service.request({
        method,
        url: path,
        data,
        ...config,
      });
      return new APIResponse<T>(response.data);
    } catch (error: any) {
      const apiErrPayload =
        error?.response?.data ??
        ({
          code: 'NETWORK_ERROR',
          httpStatusCode: 0,
          message: error?.message || 'Network error. Please try again.',
        } as APIError);

      console.warn(
        `[APIService] ${method.toUpperCase()} ${path} failed | baseURL=${
          this.service.defaults.baseURL
        } | message=${apiErrPayload.message}`,
      );

      return new APIResponse<T>(undefined, new APIError(apiErrPayload));
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

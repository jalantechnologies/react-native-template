import { AsyncError, AsyncResult } from './async';

export class APIError implements AsyncError {
  code: string;
  httpStatusCode: number;
  message: string;

  constructor(json: any) {
    this.code = json.code as string;
    this.httpStatusCode = json.httpStatusCode as number;
    this.message = json.message as string;
  }
}

export class APIResponse<T = any> implements AsyncResult<T> {
  data?: T;
  error?: APIError;

  constructor(data?: T, error?: APIError) {
    this.data = data;
    this.error = error;
  }
}

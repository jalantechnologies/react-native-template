export interface AsyncError {
  code: string;
  message: string;
}

export interface AsyncResult<T> {
  error?: AsyncError;
  data?: T;
}

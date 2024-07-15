export interface AsyncError {
  code: string;
  message: string;
}

export interface AsyncResult<T> {
  data?: T;
  error?: AsyncError;
}

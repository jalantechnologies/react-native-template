import * as _ from 'lodash';

export class ServiceResponse<T> {
  data?: T;
  error?: string;

  constructor(data?: T, error?: string) {
    this.data = data;
    this.error = error;
  }

  hasData(): boolean {
    return !_.isNil(this.data);
  }

  hasError(): boolean {
    return !_.isNil(this.error);
  }
}

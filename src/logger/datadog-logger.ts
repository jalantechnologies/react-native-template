import { DdLogs } from '@datadog/mobile-react-native';

import Logger from './internals/types';

export default class DatadogLogger implements Logger {
  public info(message: string): void {
    DdLogs.info(message);
  }

  public debug(message: string): void {
    DdLogs.debug(message);
  }

  public error(message: string): void {
    DdLogs.error(message);
  }

  public warn(message: string): void {
    DdLogs.warn(message);
  }

  public critical(message: string): void {
    DdLogs.error(message);
  }
}

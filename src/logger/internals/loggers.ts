import Config from 'react-native-config';

import ConsoleLogger from '../console-logger';
import DatadogLogger from '../datadog-logger';

import Logger, { LoggerTransport } from './types';

export default class Loggers {
  private static loggers: Logger[];

  constructor() {
    let transports = Config.LOGGER?.split(',');
    const loggerTransports: Logger[] = [];

    if (transports === undefined) {
      transports = ['console'];
    }

    transports.forEach((loggerTransport: string) => {
      switch (loggerTransport) {
        case LoggerTransport.Datadog:
          loggerTransports.push(Loggers.getDatadogLogger());
          break;
        default:
          loggerTransports.push(Loggers.getConsoleLogger());
      }
    });

    Loggers.loggers = loggerTransports;
  }

  static getConsoleLogger(): ConsoleLogger {
    return new ConsoleLogger();
  }

  static getDatadogLogger(): DatadogLogger {
    return new DatadogLogger();
  }

  public static info(message: string): void {
    Loggers.loggers.forEach(logger => {
      logger.info(message);
    });
  }

  public static debug(message: string): void {
    Loggers.loggers.forEach(logger => {
      logger.debug(message);
    });
  }

  public static error(message: string): void {
    Loggers.loggers.forEach(logger => {
      logger.error(message);
    });
  }

  public static warn(message: string): void {
    Loggers.loggers.forEach(logger => {
      logger.warn(message);
    });
  }

  public static critical(message: string): void {
    Loggers.loggers.forEach(logger => {
      logger.critical(message);
    });
  }
}

import Logger from './internals/types';

export default class ConsoleLogger implements Logger {
  public info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  public debug(message: string): void {
    console.log(`[DEBUG] ${message}`);
  }

  public error(message: string): void {
    console.log(`[ERROR] ${message}`);
  }

  public warn(message: string): void {
    console.log(`[WARN] ${message}`);
  }

  public critical(message: string): void {
    console.log(`[CRITICAL] ${message}`);
  }
}

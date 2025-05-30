import { MMKV } from 'react-native-mmkv';

export class LocalStorageService {
  private static storage = new MMKV();

  public static getFromStorage(key: string): string | null {
    const value = this.storage.getString(key);
    return value ?? null;
  }

  public static setToStorage(key: string, value: string): void {
    this.storage.set(key, value);
  }

  public static removeFromStorage(key: string): void {
    this.storage.delete(key);
  }

  public static clearStorage(): void {
    this.storage.clearAll();
  }
}

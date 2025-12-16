import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorageService {
  public static async getFromStorage(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.warn('LocalStorageService.getFromStorage error:', error);
      return null;
    }
  }

  public static async setToStorage(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.warn('LocalStorageService.setToStorage error:', error);
    }
  }

  public static async removeFromStorage(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn('LocalStorageService.removeFromStorage error:', error);
    }
  }

  public static async clearStorage(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.warn('LocalStorageService.clearStorage error:', error);
    }
  }
}

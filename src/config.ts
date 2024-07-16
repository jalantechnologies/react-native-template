import RNConfig from 'react-native-config';

export default class Config {
  static ENVIRONMENT: string | undefined = RNConfig.ENVIRONMENT;
  static API_BASE_URL: string | undefined = RNConfig.API_BASE_URL;
  static DD_CLIENT_TOKEN: string | undefined = RNConfig.DD_CLIENT_TOKEN;
  static DD_ENVIRONMENT_NAME: string | undefined = RNConfig.DD_ENVIRONMENT_NAME;
  static DD_APPLICATION_ID: string | undefined = RNConfig.DD_APPLICATION_ID;
  static LOGGER: string | undefined = RNConfig.LOGGER;
}

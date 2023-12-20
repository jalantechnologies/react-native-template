import RNConfig from 'react-native-config';

export default class Config {
  static ENVIRONMENT: string = RNConfig.ENVIRONMENT;
  static API_BASE_URL: string = RNConfig.API_BASE_URL;
  static DD_CLIENT_TOKEN: string = RNConfig.DD_CLIENT_TOKEN;
  static DD_ENVIRONMENT_NAME: string = RNConfig.DD_ENVIRONMENT_NAME;
  static DD_RUM_APPLICATION_ID: string = RNConfig.DD_RUM_APPLICATION_ID;
  static LOGGER: string = RNConfig.LOGGER;
}

import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type AuthenticatedParamsList = {
  Dashboard: undefined;
};

export type MainParamsList = {
  PhoneAuth: undefined;
  OTPVerify: undefined;
  Authenticated: NavigatorScreenParams<AuthenticatedParamsList>;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;

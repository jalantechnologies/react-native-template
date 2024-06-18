import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type UserPortalStackParamList = {
  Registration: undefined;
};

export type UserPortalDrawerParamList = {
  Dashboard: undefined;
};

export type MainParamsList = {
  SignUp: undefined;
  OTP: undefined;
  UserPortal: NavigatorScreenParams<
    UserPortalDrawerParamList & UserPortalStackParamList
  >;
};

export type ApplicationStackParamList = {
  Startup: undefined;
  Main: NavigatorScreenParams<MainParamsList>;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;

import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
  Main: NavigatorScreenParams<MainParamsList>;
  Startup: undefined;
};

export type ApplicationScreenProps = StackScreenProps<ApplicationStackParamList>;

export type MainParamsList = {
  Authenticated: NavigatorScreenParams<
    AuthenticatedStackParamsList | AuthenticatedDrawerParamsList
  >;
  OTPVerify: { countryCode: string; phoneNumber: string };
  PhoneAuth: undefined;
};

export type MainScreenProps<T extends keyof MainParamsList> = CompositeScreenProps<
  StackScreenProps<MainParamsList, T>,
  ApplicationScreenProps<keyof ApplicationStackParamList>
>;

export type AuthenticatedDrawerParamsList = {
  Dashboard: undefined;
};

export type AuthenticatedDrawerScreenProps<T extends keyof AuthenticatedDrawerParamsList> =
  CompositeScreenProps<
    StackScreenProps<AuthenticatedDrawerParamsList, T>,
    MainScreenProps<'Authenticated'>
  >;

export type AuthenticatedStackParamsList = {
  Registration: undefined;
};

export type AuthenticatedStackScreenProps<T extends keyof AuthenticatedStackParamsList> =
  CompositeScreenProps<
    StackScreenProps<AuthenticatedStackParamsList, T>,
    MainScreenProps<'Authenticated'>
  >;

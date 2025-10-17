import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

// Application stack parameter list
export type ApplicationStackParamList = {
  Main: NavigatorScreenParams<MainParamsList>;
  Startup: undefined;
};

// Main stack parameter list
export type MainParamsList = {
  Authenticated: NavigatorScreenParams<AuthenticatedStackParamsList | AuthenticatedTabParamsList>;
  OTPVerify: { countryCode: string; phoneNumber: string };
  PhoneAuth: undefined;
};

// Authenticated tab parameter list
export type AuthenticatedTabParamsList = {
  Home: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamsList>;
};

// Profile stack parameter list
export type ProfileStackParamsList = {
  Home: undefined;
  EditProfile: undefined;
};

// Authenticated stack parameter list
export type AuthenticatedStackParamsList = {
  Registration: undefined;
};

// Application screen props
export type ApplicationScreenProps = StackScreenProps<ApplicationStackParamList>;

// Main screen props
export type MainScreenProps<T extends keyof MainParamsList> = CompositeScreenProps<
  StackScreenProps<MainParamsList, T>,
  ApplicationScreenProps
>;

// Authenticated tab screen props
export type AuthenticatedTabScreenProps<T extends keyof AuthenticatedTabParamsList> =
  CompositeScreenProps<
    BottomTabScreenProps<AuthenticatedTabParamsList, T>,
    MainScreenProps<'Authenticated'>
  >;

// Profile stack screen props
export type ProfileStackScreenProps<T extends keyof ProfileStackParamsList> = CompositeScreenProps<
  StackScreenProps<ProfileStackParamsList, T>,
  AuthenticatedTabScreenProps<'Profile'>
>;

// Authenticated stack screen props
export type AuthenticatedStackScreenProps<T extends keyof AuthenticatedStackParamsList> =
  CompositeScreenProps<
    StackScreenProps<AuthenticatedStackParamsList, T>,
    MainScreenProps<'Authenticated'>
  >;

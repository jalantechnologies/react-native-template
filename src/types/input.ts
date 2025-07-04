import { KeyboardTypeOptions, TextInput, TextInputProps, TextStyle } from 'react-native';

export enum KeyboardTypes {
  ASCII_CAPABLE = 'ascii-capable',
  DECIMAL_PAD = 'decimal-pad',
  DEFAULT = 'default',
  EMAIL_ADDRESS = 'email-address',
  NAME_PHONE_PAD = 'name-phone-pad',
  NUMBER_PAD = 'number-pad',
  NUMBERS_AND_PUNCTUATION = 'numbers-and-punctuation',
  NUMERIC = 'numeric',
  PHONE_PAD = 'phone-pad',
  TWITTER = 'twitter',
  URL = 'url',
  VISIBLE_PASSWORD = 'visible-password',
  WEB_SEARCH = 'web-search',
}

export enum InputStatus {
  DEFAULT = 'default',
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface InputProps extends Omit<TextInputProps, 'style | multiline'> {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  handleInputRef?: (ref: TextInput) => void;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  message?: string;
  startEnhancer?: React.ReactElement | string;
  status?: InputStatus;
  testId?: string;
  textAlign?: Exclude<TextStyle['textAlign'], 'auto' | 'justify'>;
}

export interface PasswordInputProps extends InputProps {}

export interface TextAreaInputProps extends Omit<TextInputProps, 'style | multiline'> {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  handleInputRef?: (ref: TextInput) => void;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  numberOfLines?: number;
  startEnhancer?: React.ReactElement | string;
  testId?: string;
  textAlign?: Exclude<TextStyle['textAlign'], 'auto' | 'justify'>;
}

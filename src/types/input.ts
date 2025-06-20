import { KeyboardTypeOptions, TextInput, TextInputProps, TextStyle } from 'react-native';

export interface InputProps extends Omit<TextInputProps, 'style | multiline'> {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  handleInputRef?: (ref: TextInput) => void;
  keyboardType?: KeyboardTypeOptions;
  startEnhancer?: React.ReactElement | string;
  testId?: string;
  textAlign?: Exclude<TextStyle['textAlign'], 'auto' | 'justify'>;
}

export interface PasswordInputProps extends InputProps {}

export interface TextAreaInputProps extends Omit<TextInputProps, 'style | multiline'> {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  handleInputRef?: (ref: TextInput) => void;
  keyboardType?: KeyboardTypeOptions;
  startEnhancer?: React.ReactElement | string;
  testId?: string;
  textAlign?: Exclude<TextStyle['textAlign'], 'auto' | 'justify'>;
  numberOfLines?: number;
}

export enum KeyboardTypes {
  DEFAULT = 'default',
  EMAIL_ADDRESS = 'email-address',
  NUMERIC = 'numeric',
  PHONE_PAD = 'phone-pad',
  NUMBER_PAD = 'number-pad',
  DECIMAL_PAD = 'decimal-pad',
  VISIBLE_PASSWORD = 'visible-password',
  ASCII_CAPABLE = 'ascii-capable',
  NUMBERS_AND_PUNCTUATION = 'numbers-and-punctuation',
  URL = 'url',
  NAME_PHONE_PAD = 'name-phone-pad',
  TWITTER = 'twitter',
  WEB_SEARCH = 'web-search',
}

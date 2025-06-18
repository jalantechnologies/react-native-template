import { TextStyle } from 'react-native';

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

export interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypes;
  style?: TextStyle;
}

import { ReactNode } from 'react';
import { KeyboardTypeOptions, TextInput, TextInputProps, TextStyle } from 'react-native';

export interface DropdownInputProps {
  children: React.ReactElement<DropdownOptionProps>[];
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  onValueChange: (value: string) => void;
  status?: InputStatus;
  successMessage?: string;
  value?: ReactNode;
}

export interface DropdownOptionProps {
  children: ReactNode;
  value: string;
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

export interface CountryOption {
  label: ReactNode;
  value: string;
}

export interface MobileNumberInputProps {
  country: string;
  countryOptions: CountryOption[];
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  mobileNumber: string;
  onCountryChange: (value: string) => void;
  onMobileNumberChange: (value: string) => void;
  status?: InputStatus;
  successMessage?: string;
}

export interface WebsiteUrlInputProps {
  disabled?: boolean;
  errorMessage?: string;
  label?: string;
  onUrlChange: (value: string) => void;
  onValidate: (finalUrl: string, status: InputStatus) => void;
  status?: InputStatus;
  successMessage?: string;
  url: string;
}

export interface CardDetailsInputProps {
  cardNumber: string;
  cvv: string;
  disabled?: boolean;
  errorMessage?: string;
  expiry: string;
  label?: string;
  onCardNumberChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
  onValidate?: (
    result: { cardNumber: string; expiry: string; cvv: string } | '',
    status: InputStatus,
  ) => void;
  status?: InputStatus;
  successMessage?: string;
}

import React, { ReactNode } from 'react';
import { KeyboardTypeOptions, TextInput, TextInputProps, TextStyle } from 'react-native';

export enum InputStatus {
  DEFAULT = 'default',
  ERROR = 'error',
  SUCCESS = 'success',
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

export interface InputProps extends Omit<TextInputProps, 'style | multiline'> {
  disabled?: boolean;
  endEnhancer?: React.ReactNode;
  handleInputRef?: (ref: TextInput) => void;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  message?: string;
  startEnhancer?: React.ReactNode;
  status?: InputStatus;
  testId?: string;
  textAlign?: Exclude<TextStyle['textAlign'], 'auto' | 'justify'>;
}

export interface PasswordInputProps extends InputProps {}

export interface TextAreaInputProps extends Omit<TextInputProps, 'style | multiline'> {
  disabled?: boolean;
  endEnhancer?: React.ReactNode;
  handleInputRef?: (ref: TextInput) => void;
  keyboardType?: KeyboardTypeOptions;
  label?: string;
  numberOfLines?: number;
  startEnhancer?: React.ReactNode;
  testId?: string;
  textAlign?: Exclude<TextStyle['textAlign'], 'auto' | 'justify'>;
}

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

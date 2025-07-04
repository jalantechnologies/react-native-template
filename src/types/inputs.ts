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

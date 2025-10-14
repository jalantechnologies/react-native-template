export enum InputStatus {
  DEFAULT = 'default',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum KeyboardTypes {
  DEFAULT = 'default',
  NUMBER_PAD = 'number-pad',
}

export interface CardDetailsInputProps {
  cardHolderName: string;
  onCardHolderNameChange: (value: string) => void;
  cardNumber: string;
  onCardNumberChange: (value: string) => void;
  expiry: string;
  onExpiryChange: (value: string) => void;
  cvv: string;
  onCvvChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
  status?: InputStatus;
  onValidate?: (
    result: { cardHolderName?: string; cardNumber: string; expiry: string; cvv: string } | '',
    status: InputStatus,
  ) => void;
  errorMessage?: string;
  successMessage?: string;
}

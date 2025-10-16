export enum InputStatus {
  DEFAULT = 'default',
  ERROR = 'error',
  SUCCESS = 'success',
}

export enum KeyboardTypes {
  DEFAULT = 'default',
  NUMBER_PAD = 'number-pad',
}

export interface CardValidationResult {
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expiry: string;
}

export interface CardDetailsInputProps {
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  disabled?: boolean;
  errorMessage?: string;
  expiry: string;
  label?: string;
  onCardHolderNameChange: (value: string) => void;
  onCardNumberChange: (value: string) => void;
  onCvvChange: (value: string) => void;
  onExpiryChange: (value: string) => void;
  onValidate?: (result: CardValidationResult | null, status: InputStatus) => void;
  status?: InputStatus;
  successMessage?: string;
}

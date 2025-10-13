// Input status types for showing validation states
export enum InputStatus {
  DEFAULT = 'default',
  ERROR = 'error',
  SUCCESS = 'success',
}

// Keyboard types used for card details
export enum KeyboardTypes {
  DEFAULT = 'default',       // for card holder name
  NUMBER_PAD = 'number-pad', // for card number, expiry, and CVV
}

// Props for the CardDetailsInput component
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

  // Validation
  status?: InputStatus; 
  onValidate?: (
    result: { cardHolderName?: string; cardNumber: string; expiry: string; cvv: string } | '',
    status: InputStatus,
  ) => void;    

  // Error Messages
  errorMessage?: string;    
  successMessage?: string;   
}

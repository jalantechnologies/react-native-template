import { INPUT_SIZE, INPUT_VARIANT } from './constants';
export type InputSize = keyof typeof INPUT_SIZE;
export type InputVariant = keyof typeof INPUT_VARIANT;

export interface InputProps {
  size?: InputSize; 
  variant?: InputVariant;
  isDisabled?: boolean;
  isError?: boolean; 
  startIcon?: React.ReactNode; 
  endIcon?: React.ReactNode;
  value?: string; 
  placeholder?: string; 
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean; 
  onChangeText?: (text: string) => void; 
}

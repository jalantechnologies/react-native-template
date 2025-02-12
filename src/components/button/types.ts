import { BUTTON_KIND, BUTTON_SIZE, BUTTON_SHAPE } from './constants';

export type ButtonVariant = keyof typeof BUTTON_KIND;
export type ButtonSize = keyof typeof BUTTON_SIZE;
export type ButtonShape = keyof typeof BUTTON_SHAPE;

export interface ButtonProps {
  variant?: ButtonVariant; // Defines button style
  size?: ButtonSize; // Defines button size
  shape?: ButtonShape; // Defines button shape
  isDisabled?: boolean; // Disables button interaction
  isLoading?: boolean; // Shows a loading spinner inside the button
  leftIcon?: React.ReactNode; // Icon before text
  rightIcon?: React.ReactNode; // Icon after text
  onPress?: () => void; // Click/Press handler
  children: React.ReactNode; // Button label or content
}

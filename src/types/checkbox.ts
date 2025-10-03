export enum CheckboxSize {
  LARGE = 'large',
  SMALL = 'small',
}

export enum CheckboxShape {
  CIRCLE = 'circle',
  SQUARE = 'square',
}

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  onPress: (label?: string) => void;
  shape?: CheckboxShape;
  size?: CheckboxSize;
}

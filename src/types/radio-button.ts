export enum RadioButtonKind {
  ERROR = 'error',
  PRIMARY = 'primary',
  SUCCESS = 'success',
}

export enum RadioButtonSize {
  LARGE = 'large',
  SMALL = 'small',
}

export interface RadioButtonProps {
  disabled?: boolean;
  kind?: RadioButtonKind;
  label?: string;
  onPress: (value: string) => void;
  selected: boolean;
  size?: RadioButtonSize;
  value: string;
}

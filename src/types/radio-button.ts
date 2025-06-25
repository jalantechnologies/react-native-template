export enum RadioButtonKind {
  ERROR = 'error',
  PRIMARY = 'primary',
  SUCCESS = 'success',
}

export interface RadioButtonProps {
  disabled?: boolean;
  kind?: RadioButtonKind;
  label?: string;
  onPress: (value: string) => void;
  selected: boolean;
  small?: boolean;
  indeterminate?: boolean;
  value: string;
}

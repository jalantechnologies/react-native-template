export enum RadioButtonKind {
  PRIMARY = 'primary',
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface RadioButtonProps {
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
  label?: string;
  disabled?: boolean;
  kind?: RadioButtonKind;
}

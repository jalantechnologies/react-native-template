export enum SpinnerTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum SpinnerSize {
  SMALL = 'small',
  LARGE = 'large',
}

export interface SpinnerProps {
  size?: SpinnerSize;
  type?: SpinnerTypes;
}

export interface MulticolorSpinnerProps {
  size?: SpinnerSize;
  colors?: string[];
}

export type SpinnerAnimationType = 'indeterminate' | 'fixed';

export interface SpinnerProps {
  size?: number;
  color?: string;
  /** Animation type: continuously spinning ("indeterminate") or a single fixed rotation ("fixed") */
  animationType?: SpinnerAnimationType;
  duration?: number;
  /** Additional custom styles (placeholder for future NativeWind integration) */
  style?: any;
}

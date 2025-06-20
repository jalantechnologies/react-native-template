export enum SliderOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export interface CustomSliderProps {
  lowerLimit?: number;
  maximumTrackTintColor?: string;
  minimumTrackTintColor?: string;
  onValueChange?: (val: number) => void;
  orientation?: SliderOrientation;
  step?: number;
  thumbTintColor?: string;
  upperLimit?: number;
  value?: number;
}

export enum SliderOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export interface CustomSliderProps {
  value?: number;
  step?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  lowerLimit?: number;
  upperLimit?: number;
  orientation?: SliderOrientation;
}

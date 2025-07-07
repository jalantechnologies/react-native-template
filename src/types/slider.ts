export enum SliderOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export interface SliderProps {
  lowerLimit?: number;
  onValueChange?: (val: number) => void;
  orientation?: SliderOrientation;
  step?: number;
  upperLimit?: number;
  value?: number;
}

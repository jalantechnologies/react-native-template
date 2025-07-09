export interface SliderProps {
  disabled?: boolean;
  internalMarkerStep?: number;
  isRange?: boolean;
  lowerLimit?: number;
  onValueChange?: (val: number | [number, number]) => void;
  showEndMarkers?: boolean;
  showValueInput?: boolean;
  step?: number;
  upperLimit?: number;
  value: number | [number, number];
}

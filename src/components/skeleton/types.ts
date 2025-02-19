export type SkeletonShape = 'rect' | 'circle';

export interface SkeletonProps {
  isVisible?: boolean;
  shape?: SkeletonShape;
  width?: number;
  height?: number;
  animation?: boolean;
  style?: any;
}

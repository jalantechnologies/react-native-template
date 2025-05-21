import { Skeleton, VStack } from 'native-base';
import React, { PropsWithChildren } from 'react';

export enum SkeletonVariant {
  Rect = 'rect',
  Rounded = 'rounded',
  Circle = 'circle',
  Text = 'text',
}

interface SkeletonLoaderProps extends PropsWithChildren {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  count?: number;
  isVisible?: boolean;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = SkeletonVariant.Rect,
  width = '100%',
  height = 20,
  count = 1,
  isVisible = true,
  children,
}) => {
  const getSkeletonProps = () => {
    switch (variant) {
      case SkeletonVariant.Circle:
        return { rounded: 'full', w: height, h: height };
      case SkeletonVariant.Rounded:
        return { rounded: 'xl', w: width, h: height };
      case SkeletonVariant.Text:
        return { rounded: 'sm', w: width, h: 16 };
      case SkeletonVariant.Rect:
      default:
        return { rounded: 'md', w: width, h: height };
    }
  };

  if (!isVisible) {
    return <>{children}</>;
  }

  return (
    <VStack space={2} padding={2}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          {...getSkeletonProps()}
          startColor="primary"
          endColor="secondary"
          isLoaded={false}
        />
      ))}
    </VStack>
  );
};

SkeletonLoader.defaultProps = {
  variant: SkeletonVariant.Rect,
  width: '100%',
  height: 20,
  count: 1,
  isVisible: true,
};

export default SkeletonLoader;

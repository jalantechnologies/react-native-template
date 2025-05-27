import { SpinnerSize } from 'boilerplate-react-native/src/types/spinner';
import { VStack } from 'native-base';
import React from 'react';
import { DimensionValue, Image } from 'react-native';

import Spinner from '../spinner/spinner';

type Props = {
  height?: DimensionValue;
  width?: DimensionValue;
};

const Brand: React.FC<Props> = ({ height, width }: Props) => {
  return (
    <VStack
      testID="brand-img-wrapper"
      height={height ? `${height}px` : '100%'}
      width={width ? `${width}px` : '100%'}
      justifyContent="center"
      alignItems="center"
      backgroundColor={'secondary.50'}
      space={4}
    >
      <Image
        source={require('../../../assets/img/logo.png')}
        alt="Brand Logo"
        resizeMode="contain"
        width={100}
        height={100}
      />
      <Spinner size={SpinnerSize.LARGE} />
    </VStack>
  );
};

Brand.defaultProps = {
  height: undefined,
  width: undefined,
};

export default Brand;

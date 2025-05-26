import { Box, Heading } from 'native-base';
import React from 'react';
import { DimensionValue, Image } from 'react-native';

import Spinner from '../spinner/spinner';

type Props = {
  height?: DimensionValue;
  width?: DimensionValue;
};

const Brand: React.FC<Props> = ({ height, width }: Props) => {
  return (
    <Box
      testID="brand-img-wrapper"
      height={height ? `${height}px` : '100%'}
      width={width ? `${width}px` : '100%'}
      justifyContent="center"
      alignItems="center"
      backgroundColor={'secondary.50'}
    >
      <Image
        source={require('../../../assets/img/logo.png')}
        alt="Brand Logo"
        resizeMode="contain"
        width={100}
        height={100}
      />
      <Heading color={'primary.500'} my={4}>
        Better Software
      </Heading>
      <Spinner size="large" color="primary.500" />
    </Box>
  );
};

Brand.defaultProps = {
  height: undefined,
  width: undefined,
};

export default Brand;

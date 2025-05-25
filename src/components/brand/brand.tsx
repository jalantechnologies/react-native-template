import { Box, Heading } from 'native-base';
import React from 'react';
import { DimensionValue } from 'react-native';

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
      backgroundColor={'primary.500'}
    >
      <Heading color={'secondary.50'} mb={4}>
        Better Software
      </Heading>
      <Spinner size="large" color="secondary.50" />
    </Box>
  );
};

Brand.defaultProps = {
  height: undefined,
  width: undefined,
};

export default Brand;

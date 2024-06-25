import { Box, Heading } from 'native-base';
import React from 'react';
import { DimensionValue } from 'react-native';

type Props = {
  height?: DimensionValue;
  width?: DimensionValue;
};

const Brand: React.FC<Props> = ({ height, width }: Props) => {
  return (
    <Box
      testID="brand-img-wrapper"
      height={`${height}px`}
      width={`${width}px`}
      justifyContent="center"
      alignItems="center"
    >
      <Heading>Jalan Technologies</Heading>
    </Box>
  );
};

Brand.defaultProps = {
  height: 400,
  width: 400,
};

export default Brand;

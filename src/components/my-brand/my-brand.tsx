import React from 'react';
import { View, DimensionValue } from 'react-native';
import { styles } from './styles';
import { Text } from '@rneui/themed';

type Props = {
  height?: DimensionValue;
  width?: DimensionValue;
};

const Brand: React.FC<Props> = ({ height, width }: Props) => {
  return (
    <View
      testID="brand-img-wrapper"
      style={[styles.brandContainer, { height, width }]}
    >
      <Text h1>Jalan Technologies</Text>
    </View>
  );
};

Brand.defaultProps = {
  height: 400,
  width: 400,
};

export default Brand;

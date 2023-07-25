import React from 'react';
import { View, DimensionValue, Text, Image } from 'react-native';
import { styles } from './styles';

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
      <Image
        testID="brand-img"
        source={{
          uri: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2866&q=80',
        }}
        resizeMode="contain"
      />
      <Text>Jalan Technologies</Text>
    </View>
  );
};

Brand.defaultProps = {
  height: 400,
  width: 400,
};

export default Brand;

import React from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import tw from '../../lib/tailwind';

const Brand: React.FC = () => {
  return (
    <View
      testID="brand-img-wrapper"
      style={tw`items-center justify-center h-96 w-96`}
    >
      <Text h1>Jalan Technologies</Text>
    </View>
  );
};

export default Brand;

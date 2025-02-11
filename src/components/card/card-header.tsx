import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

const CardHeader: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <View>{children}</View>;
};

export default CardHeader;

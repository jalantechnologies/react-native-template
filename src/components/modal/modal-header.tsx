import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

const ModalHeader: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <View>{children}</View>;
};

export default ModalHeader;

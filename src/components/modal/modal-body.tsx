import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

const ModalBody: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <View>{children}</View>;
};

export default ModalBody;

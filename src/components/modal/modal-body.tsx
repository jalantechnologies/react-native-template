import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { ModalBodyProps } from './types';

const ModalBody: React.FC<PropsWithChildren<ModalBodyProps>> = ({ children }) => {
  return <View>{children}</View>;
};

export default ModalBody;

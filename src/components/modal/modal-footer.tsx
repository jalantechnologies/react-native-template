import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { ModalFooterProps } from './types';

const ModalFooter: React.FC<PropsWithChildren<ModalFooterProps>> = ({ children }) => {
  return <View>{children}</View>;
};

export default ModalFooter;

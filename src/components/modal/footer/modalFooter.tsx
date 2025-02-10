import React from 'react';
import { View } from 'react-native';

import { styles } from './modalFooter.styles';

interface ModalFooterProps {
  children: React.ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return <View style={styles.footer}>{children}</View>;
};

export default ModalFooter;

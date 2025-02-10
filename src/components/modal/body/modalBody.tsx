import React from 'react';
import { View } from 'react-native';

import { styles } from './modalBody.styles';

interface ModalBodyProps {
  children: React.ReactNode;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return <View style={styles.body}>{children}</View>;
};

export default ModalBody;

import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

import { useModalStyles } from './modal.styles';

const ModalBody: React.FC<PropsWithChildren> = ({ children }) => {
  const styles = useModalStyles();

  return <View style={styles.modalBody}>{children}</View>;
};

export default ModalBody;

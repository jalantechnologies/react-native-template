import React, { PropsWithChildren } from 'react';
import { View, Modal as RNModal } from 'react-native';

import { ModalProps } from './types';

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  isVisible,
  onClose,
  children,
  ...rest
}) => {
  return (
    <RNModal transparent visible={isVisible} onRequestClose={onClose} {...rest}>
      <View>{children}</View>
    </RNModal>
  );
};

export default Modal;

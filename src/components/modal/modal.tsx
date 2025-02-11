import React, { PropsWithChildren } from 'react';
import { View, Modal as RNModal, ModalProps as RNModalProps } from 'react-native';

interface ModalProps extends RNModalProps {
  isVisible: boolean;
  onClose: () => void;
}

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

import React, { PropsWithChildren } from 'react';
import { Modal as RNModal, View, TouchableWithoutFeedback } from 'react-native';

import { useModalStyles } from './modal.styles';

interface ModalProps {
  isModalOpen: boolean;
  onRequestClose?: () => void;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  isModalOpen,
  onRequestClose,
}) => {
  const styles = useModalStyles();

  return (
    <RNModal visible={isModalOpen} transparent animationType="fade" onRequestClose={onRequestClose}>
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

Modal.defaultProps = {
  onRequestClose: () => {},
};

export default Modal;

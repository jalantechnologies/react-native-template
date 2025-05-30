import React, { PropsWithChildren } from 'react';
import {
  Modal as RNModal,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';

import ModalBody from './modal-body.component';
import ModalFooter from './modal-footer.component';
import ModalHeader from './modal-header.component';
import { useModalStyles } from './modal.styles';

export interface ModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
}

const ModalComponent: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  isModalOpen,
  handleModalClose,
}) => {
  const styles = useModalStyles();

  return (
    <RNModal
      visible={isModalOpen}
      transparent
      animationType="slide"
      onRequestClose={handleModalClose}
    >
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView behavior={'position'} style={styles.modalKeyboardAvoidingView}>
              <View style={styles.modalContent}>{children}</View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const Modal = ModalComponent as typeof ModalComponent & {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
};

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

export default Modal;

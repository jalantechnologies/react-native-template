import React from 'react';
import { Modal as RNModal, View, ViewProps } from 'react-native';

import ModalBody from './body/modalBody';
import ModalFooter from './footer/modalFooter';
import ModalHeader from './header/modalHeader';
import { styles } from './modal.styles';

interface ModalProps extends ViewProps {
  isOpen: boolean;
  onClose: () => void;
  closeable?: boolean;
  size?: 'small' | 'medium' | 'large';
  animationType?: 'none' | 'slide' | 'fade';
  overrides?: object;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  closeable = true,
  size = 'medium',
  animationType = 'fade',
  overrides = {},
  header,
  body,
  footer,
  ...rest
}) => {
  return (
    <RNModal
      visible={isOpen}
      animationType={animationType}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={[styles.modal, styles[size], overrides]} {...rest}>
          {header && (
            <ModalHeader onClose={onClose} closeable={closeable}>
              {header}
            </ModalHeader>
          )}
          {body && <ModalBody>{body}</ModalBody>}
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

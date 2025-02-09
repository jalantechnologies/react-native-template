import React from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, ViewProps } from 'react-native';

import { styles } from './modal.styles';

interface ModalProps extends ViewProps {
  isVisible: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  animationType?: 'none' | 'slide' | 'fade';
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  header,
  body,
  footer,
  size = 'medium',
  animationType = 'fade',
  style,
  ...rest
}) => {
  return (
    <RNModal
      visible={isVisible}
      animationType={animationType}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={[styles.modal, styles[size], style]} {...rest}>
          {header && <View style={styles.header}>{header}</View>}
          {body && <View style={styles.body}>{body}</View>}
          {footer && <View style={styles.footer}>{footer}</View>}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
};

Modal.defaultProps = {
  header: null,
  body: null,
  footer: null,
  size: 'medium',
  animationType: 'fade',
};

export default Modal;

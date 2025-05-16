import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { styles } from './modal.styles';

interface ModalFooterProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
  isConfirmDisabled?: boolean;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  onCancel,
  onConfirm,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  isConfirmDisabled = false,
}) => (
  <View style={styles.footerContainer}>
    <TouchableOpacity style={styles.button} onPress={onCancel}>
      <Text style={styles.cancelText}>{cancelText}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.button, isConfirmDisabled && styles.disabledButton]}
      onPress={onConfirm}
      disabled={isConfirmDisabled}
    >
      <Text style={[styles.confirmText, isConfirmDisabled && styles.disabledText]}>
        {confirmText}
      </Text>
    </TouchableOpacity>
  </View>
);

ModalFooter.defaultProps = {
  onCancel: () => {},
  onConfirm: () => {},
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  isConfirmDisabled: false,
};

export default ModalFooter;

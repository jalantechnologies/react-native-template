import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { styles } from './modal.styles';
import { Nullable } from 'boilerplate-react-native/src/types';

interface ModalFooterProps {
  onCancel?: Nullable<() => void>;
  onConfirm?: Nullable<() => void>;
  cancelText?: string;
  confirmText?: string;
  isConfirmDisabled?: boolean;
  children?: React.ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  onCancel,
  onConfirm,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  isConfirmDisabled = false,
  children,
}) => (
  <View style={styles.footerContainer}>
    {onCancel && (
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Text style={styles.cancelText}>{cancelText}</Text>
      </TouchableOpacity>
    )}
    {onConfirm && (
      <TouchableOpacity
        style={[styles.button, isConfirmDisabled && styles.disabledButton]}
        onPress={onConfirm}
        disabled={isConfirmDisabled}
      >
        <Text style={[styles.confirmText, isConfirmDisabled && styles.disabledText]}>
          {confirmText}
        </Text>
      </TouchableOpacity>
    )}
    {children}
  </View>
);

ModalFooter.defaultProps = {
  onCancel: null,
  onConfirm: null,
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  isConfirmDisabled: false,
  children: null,
};

export default ModalFooter;

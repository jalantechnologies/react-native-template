import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useModalStyles } from './modal.styles';

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  textAlign?: 'left' | 'center' | 'right';
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose, textAlign }) => {
  const styles = useModalStyles();

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitle, { textAlign }]}>{title}</Text>
      {onClose && (
        <TouchableOpacity onPress={onClose} style={styles.headerCloseButton}>
          <Text style={styles.headerCloseText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

ModalHeader.defaultProps = {
  onClose: undefined,
  textAlign: 'center',
};

export default ModalHeader;

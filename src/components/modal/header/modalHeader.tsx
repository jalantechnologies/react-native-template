import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { styles } from './modalHeader.styles';

interface ModalHeaderProps {
  children: React.ReactNode;
  onClose: () => void;
  closeable: boolean;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, onClose, closeable }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{children}</Text>
      {closeable && (
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ModalHeader;

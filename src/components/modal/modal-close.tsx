import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ModalCloseProps {
  onClose: () => void;
}

/**
 * ModalClose Component
 * - A reusable close button for modals
 *
 * Example usage:
 * <ModalClose onClose={handleClose} />
 */
const ModalClose: React.FC<ModalCloseProps> = ({ onClose }) => {
  return (
    <TouchableOpacity onPress={onClose}>
      <Text>✕</Text>
    </TouchableOpacity>
  );
};

export default ModalClose;

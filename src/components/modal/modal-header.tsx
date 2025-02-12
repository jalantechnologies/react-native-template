import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { ModalHeaderProps } from './types';

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <View>
      <Text>{title}</Text>
      {onClose && (
        <TouchableOpacity onPress={onClose}>
          <Text>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ModalHeader;

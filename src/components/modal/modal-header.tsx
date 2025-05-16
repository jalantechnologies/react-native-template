import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { ModalHeaderProps } from './types';

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1 }} />
      <Text style={{ flex: 2, textAlign: 'center' }}>{title}</Text>
      {onClose ? (
        <TouchableOpacity onPress={onClose} style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text>✕</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ flex: 1 }} />
      )}
    </View>
  );
};

export default ModalHeader;

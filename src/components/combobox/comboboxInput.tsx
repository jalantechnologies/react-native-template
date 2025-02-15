import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import { comboboxStyles } from './styles';

type ComboboxInputProps = {
  value: string;
  placeholder?: string;
  isOpen: boolean;
  onFocus: () => void;
  onChangeText: (text: string) => void;
};

export const ComboboxInput = ({
  value,
  placeholder = 'Select...',
  isOpen,
  onFocus,
  onChangeText,
}: ComboboxInputProps) => (
  <TouchableOpacity onPress={onFocus} activeOpacity={0.8}>
    <View style={comboboxStyles.inputContainer}>
      <TextInput
        style={comboboxStyles.input}
        value={value}
        placeholder={placeholder}
        onFocus={onFocus}
        onChangeText={onChangeText}
        editable={!isOpen}
      />
    </View>
  </TouchableOpacity>
);

ComboboxInput.defaultProps = {
  placeholder: 'Select...',
};

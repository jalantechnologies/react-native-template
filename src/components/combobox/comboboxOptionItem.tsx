import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { comboboxStyles } from './styles';
import { ComboboxOption } from './types';

export const ComboboxOptionItem = ({
  item,
  onPress,
}: {
  item: ComboboxOption;
  onPress: (option: ComboboxOption) => void;
}) => (
  <TouchableOpacity style={comboboxStyles.option} onPress={() => onPress(item)}>
    <Text style={comboboxStyles.optionText}>{item.label}</Text>
  </TouchableOpacity>
);

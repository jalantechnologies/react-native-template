import React from 'react';
import { FlatList } from 'react-native';

import { ComboboxOptionItem } from './comboboxOptionItem';
import { comboboxStyles } from './styles';
import { ComboboxOption } from './types';

const ITEM_HEIGHT = 40;

export const ComboboxOptionList = ({
  options,
  handleSelect,
}: {
  options: ComboboxOption[];
  handleSelect: (option: ComboboxOption) => void;
}) => (
  <FlatList
    data={options}
    style={comboboxStyles.list}
    keyExtractor={item => item.value}
    getItemLayout={(_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    })}
    renderItem={({ item }) => <ComboboxOptionItem item={item} onPress={handleSelect} />}
    keyboardShouldPersistTaps="handled"
  />
);

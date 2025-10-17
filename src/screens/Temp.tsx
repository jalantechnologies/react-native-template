import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Text } from 'native-base';

import DropdownInput from '../components/inputs/dropdown-input';

const TempDropdownScreen: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text fontSize="xl" mb={4}>
          Title
        </Text>

        <DropdownInput
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
        >
          <DropdownInput.Option value="Option 1">
            <Text>Option 1</Text>
          </DropdownInput.Option>

          <DropdownInput.Option value="Option 2">
            <Text>Option 2</Text>
          </DropdownInput.Option>
        </DropdownInput>

      </ScrollView>
    </SafeAreaView>
  );
};

export default TempDropdownScreen;

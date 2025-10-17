import { Text } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import DropdownInput from '../components/inputs/dropdown-input';

const TempDropdownScreen: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text fontSize="xl" mb={4}>
          Title
        </Text>

        <DropdownInput onValueChange={setSelectedValue} selectedValue={selectedValue}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});

export default TempDropdownScreen;

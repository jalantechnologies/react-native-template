import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioButton, Text, TouchableRipple } from 'react-native-paper';

interface AppRadioButtonProps {
  value: string;
  label: string;
  status: 'checked' | 'unchecked';
  onPress: () => void;
  disabled?: boolean;
}

const AppRadioButton: React.FC<AppRadioButtonProps> = ({ value, label, status, onPress, disabled }) => (
  <TouchableRipple onPress={onPress} disabled={disabled}>
    <View style={styles.container}>
      <RadioButton.Android value={value} status={status} disabled={disabled} />
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableRipple>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  label: {
    marginLeft: 8,
  },
});

export default AppRadioButton;

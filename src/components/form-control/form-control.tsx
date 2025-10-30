import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface FormControlProps {
  error?: string;
  label?: string;
}

const FormControl: React.FC<PropsWithChildren<FormControlProps>> = ({ children, error, label }) => {
  return (
    <View style={{ marginBottom: 8 }}>
      {label && (
        <Text variant="labelLarge" style={{ marginBottom: 6, color: '#007AFF', fontWeight: '500' }}>{label}</Text>
      )}
      <View style={{ justifyContent: 'center' }}>{children}</View>
      {error && (
        <Text style={{ color: '#E2332B', fontSize: 12, marginTop: 4 }}>{error}</Text>
      )}
    </View>
  );
};

FormControl.defaultProps = {
  error: undefined,
  label: undefined,
};

export default FormControl;

import React from 'react';
import { View, Text } from 'react-native';

import { useFormControlStyles } from './form-control.styles';

interface FormControlProps {
  error?: string;
  label: string;
  children: React.ReactNode;
}

const FormControl: React.FC<FormControlProps> = ({ children, error, label }) => {
  const styles = useFormControlStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>{children}</View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

FormControl.defaultProps = {
  error: undefined,
};

export default FormControl;

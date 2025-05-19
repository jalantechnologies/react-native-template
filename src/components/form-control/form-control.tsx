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

  const inputContainerStyle = [
    styles.inputContainer,
    error ? { borderColor: styles.error.color } : {},
  ];

  const labelStyle = [styles.label, error ? { color: styles.error.color } : {}];

  return (
    <View style={styles.container}>
      <Text style={labelStyle}>{label}</Text>
      <View style={inputContainerStyle}>{children}</View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

FormControl.defaultProps = {
  error: undefined,
};

export default FormControl;

import React, { PropsWithChildren } from 'react';
import { View, Text } from 'react-native';

import { useFormControlStyles } from './form-control.styles';

interface FormControlProps {
  error?: string;
  label?: string;
}

const FormControl: React.FC<PropsWithChildren<FormControlProps>> = ({ children, error, label }) => {
  const styles = useFormControlStyles();

  const inputContainerStyle = [
    styles.inputContainer,
    error ? { borderColor: styles.error.color, borderWidth: 1 } : {},
  ];

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={inputContainerStyle}>{children}</View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

FormControl.defaultProps = {
  error: undefined,
  label: undefined,
};

export default FormControl;

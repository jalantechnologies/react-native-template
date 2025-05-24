import React from 'react';
import { View } from 'react-native';

import Input, { InputProps } from './input';
import { useTextAreaInputStyles } from './input.styles';

interface TextAreaInputProps extends Omit<InputProps, 'multiline'> {
  numberOfLines?: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({ numberOfLines = 4, ...props }) => {
  const styles = useTextAreaInputStyles();

  return (
    <View style={styles.container}>
      <Input multiline={true} numberOfLines={numberOfLines} textAlignVertical="top" {...props} />
    </View>
  );
};

export default TextAreaInput;

TextAreaInput.defaultProps = {
  numberOfLines: 4,
};

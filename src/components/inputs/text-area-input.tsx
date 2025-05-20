import { Text } from 'native-base';
import React from 'react';
import { TextInput, TextInputProps, TextStyle, View } from 'react-native';

import { useTextAreaInputStyles } from './input.styles';

interface TextAreaInputProps extends TextInputProps {
  label?: string;
  error?: string;
  style?: TextStyle | TextStyle[];
  testId?: string;
  numberOfLines?: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label = '',
  error = '',
  testId = '',
  style = {},
  numberOfLines = 4,
  multiline = true,
}) => {
  const styles = useTextAreaInputStyles();

  return (
    <View style={styles.container}>
      {label.length > 0 ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        style={[styles.textArea, error ? styles.errorBorder : styles.defaultBorder, style]}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        testID={testId}
      />

      {error.length > 0 ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default TextAreaInput;

TextAreaInput.defaultProps = {
  error: '',
  label: '',
  testId: '',
  style: {},
  numberOfLines: 4,
};

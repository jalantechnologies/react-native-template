import { useTheme } from 'native-base';
import React from 'react';
import { TextInput as RNTextInput, View } from 'react-native';

import { KeyboardTypes, TextInputProps } from '../../types/text-input';

import { useTextInputStyles } from './text-input.styles';

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Enter input',
  secureTextEntry = false,
  keyboardType = KeyboardTypes.DEFAULT,
  style,
}) => {
  const theme = useTheme();
  const styles = useTextInputStyles();

  return (
    <View style={styles.inputContainer}>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input, style]}
        placeholderTextColor={theme.colors.muted[400]}
      />
    </View>
  );
};

export default TextInput;

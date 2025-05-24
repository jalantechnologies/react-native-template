import { Icon } from 'native-base';
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, TextInputProps } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { usePasswordInputStyles } from './input.styles';

interface PasswordInputProps extends Omit<TextInputProps, 'style'> {
  error?: string;
  name: string;
  testId?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  error,
  name,
  placeholder,
  testID,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const styles = usePasswordInputStyles();

  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, error ? styles.inputError : {}]}>
        <TextInput
          style={[styles.input]}
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          testID={testID}
          accessibilityLabel={name}
          {...props}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconButton}
          testID={`${testID}-toggle-visibility`}
        >
          <Icon
            as={
              <MaterialIcons name={isPasswordVisible ? 'visibility' : 'visibility-off'} size={6} />
            }
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

PasswordInput.defaultProps = {
  error: '',
  testId: '',
};

export default PasswordInput;

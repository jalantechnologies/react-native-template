import { Icon } from 'native-base';
import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Input, { InputProps } from './input';
import { usePasswordInputStyles } from './input.styles';

interface PasswordInputProps extends Omit<InputProps, 'isPassword'> {}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  testID,
  error,
  label,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const styles = usePasswordInputStyles();

  return (
    <View style={styles.container}>
      {label && label.length > 0 ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputWrapper}>
        <Input
          placeholder={placeholder}
          isPassword={!isPasswordVisible}
          autoCapitalize="none"
          autoCorrect={false}
          testID={testID}
          {...props}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconButton}
          testID={`${testID}-toggle-visibility`}
        >
          <Icon
            as={
              <MaterialIcons name={isPasswordVisible ? 'visibility' : 'visibility-off'} size={16} />
            }
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default PasswordInput;

import { Icon } from 'native-base';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Input, { InputProps } from './input';
import { usePasswordInputStyles } from './input.styles';

interface PasswordInputProps extends InputProps {}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, testID, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const styles = usePasswordInputStyles();

  return (
    <>
      <View style={styles.inputWrapper}>
        <Input
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
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
    </>
  );
};

export default PasswordInput;

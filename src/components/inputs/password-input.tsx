import VisibilityOffIcon from 'boilerplate-react-native/assets/icons/visibility-off.svg';
import VisibilityIcon from 'boilerplate-react-native/assets/icons/visibility.svg';
import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { KeyboardTypes, PasswordInputProps } from '../../types';

import Input from './input';
import { usePasswordInputStyles } from './input.styles';

const PasswordInput: React.FC<PasswordInputProps> = ({
  keyboardType = KeyboardTypes.DEFAULT,
  placeholder,
  testID,
  ...props
}) => {
  const theme = useTheme();

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
          keyboardType={keyboardType}
          {...props}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconButton}
          testID={`${testID}-toggle-visibility`}
        >
          {isPasswordVisible ? (
            <VisibilityIcon width={16} height={16} fill={theme.colors.primary[500]} />
          ) : (
            <VisibilityOffIcon width={16} height={16} fill={theme.colors.primary[500]} />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PasswordInput;

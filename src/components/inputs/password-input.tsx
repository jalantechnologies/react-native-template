import VisibilityOffIcon from '../../../assets/icons/visibility-off.svg';
import VisibilityIcon from '../../../assets/icons/visibility.svg';
import { useTheme } from 'native-base';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { InputStatus, KeyboardTypes, PasswordInputProps } from '../../types';

import Input from './input';

const PasswordInput: React.FC<PasswordInputProps> = ({
  keyboardType = KeyboardTypes.DEFAULT,
  placeholder,
  testID,
  disabled,
  status = InputStatus.DEFAULT,
  ...props
}) => {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <>
      <View>
        <Input
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
          label="Password"
          autoCapitalize="none"
          autoCorrect={false}
          testID={testID}
          status={status}
          keyboardType={keyboardType}
          endEnhancer={
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              testID={`${testID}-toggle-visibility`}
            >
              {isPasswordVisible ? (
                <VisibilityIcon
                  width={16}
                  height={16}
                  fill={disabled ? theme.colors.secondary[500] : theme.colors.primary[500]}
                />
              ) : (
                <VisibilityOffIcon
                  width={16}
                  height={16}
                  fill={disabled ? theme.colors.secondary[500] : theme.colors.primary[500]}
                />
              )}
            </TouchableOpacity>
          }
          {...props}
        />
      </View>
    </>
  );
};

export default PasswordInput;

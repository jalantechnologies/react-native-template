import { View, Text, TextInput, TextInputProps } from 'react-native';
import React from 'react';

interface CustomInputProps extends TextInputProps {
  errorMessage: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  errorMessage,
  ...props
}) => {
  return (
    <View>
      <TextInput
        className=" border-2 border-slate-400 text-title-xsm w-full rounded-md p-2.5 dark:text-white"
        placeholderTextColor={'gray'}
        {...props}
      />
      {errorMessage && (
        <Text className="text-red-700 text-xs m-1">{errorMessage}</Text>
      )}
    </View>
  );
};

export default CustomInput;

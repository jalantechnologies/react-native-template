import React, { forwardRef } from 'react';
import { TextInput, View } from 'react-native';

import type { InputProps } from './types';
import { getInputSizeStyle, getInputVariantStyle } from './utils';

/**
 * Input Component - A reusable and customizable text input field.
 *
 * Example usage:
 * ```tsx
 * <Input placeholder="Enter text" size="medium" onChangeText={(text) => console.log(text)} />
 * ```
 */
const Input = forwardRef<TextInput, InputProps>(
  (
    {
      size = 'medium',
      variant = 'standard',
      isDisabled = false,
      isError = false,
      startIcon,
      endIcon,
      onChangeText,
      value,
      placeholder,
      keyboardType = 'default',
      secureTextEntry = false,
      ...rest
    },
    ref,
  ) => {
    const sizeStyle = getInputSizeStyle(size);
    const variantStyle = getInputVariantStyle(variant);

    return (
      <View style={[variantStyle, isError && { borderColor: 'red', borderWidth: 1 }]}>
        {startIcon && <View>{startIcon}</View>}

        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={!isDisabled}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          style={sizeStyle}
          {...rest}
        />

        {endIcon && <View>{endIcon}</View>}
      </View>
    );
  },
);

Input.displayName = 'Input';
export default Input;

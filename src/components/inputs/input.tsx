import React, { forwardRef } from 'react';
import { View, TextInput, Text, TextInputProps, TextStyle } from 'react-native';

import { useInputStyles } from './input.styles';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  error?: string;
  handleInputRef?: (ref: TextInput) => void;
  index?: number;
  isPassword?: boolean;
  label?: string;
  startEnhancer?: React.ReactElement | string;
  testId?: string;
  textAlign?: Exclude<TextStyle['textAlign'], 'auto' | 'justify'>;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      disabled,
      endEnhancer,
      error,
      handleInputRef,
      startEnhancer,
      testId,
      textAlign = 'left',
      isPassword,
      label,
      multiline,
      numberOfLines,
      ...props
    },
    ref,
  ) => {
    const styles = useInputStyles();

    return (
      <>
        {label && label.length > 0 ? <Text style={styles.label}>{label}</Text> : null}
        <View
          style={[
            styles.container,
            error ? styles.errorBorder : styles.defaultBorder,
            disabled ? styles.disabledBackground : styles.enabledBackground,
          ]}
          testID={testId}
        >
          {startEnhancer && (
            <View style={styles.enhancer}>
              {typeof startEnhancer === 'string' ? <Text>{startEnhancer}</Text> : startEnhancer}
            </View>
          )}
          <TextInput
            {...props}
            ref={input => {
              if (handleInputRef && input) {
                handleInputRef(input);
              }
              if (typeof ref === 'function') {
                ref(input);
              }
            }}
            editable={!disabled}
            style={[
              styles.input,
              disabled && styles.disabled,
              textAlign && { textAlign },
              multiline && numberOfLines ? styles.multiline : {},
            ]}
            secureTextEntry={isPassword}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {endEnhancer && (
            <View style={styles.enhancer}>
              {typeof endEnhancer === 'string' ? <Text>{endEnhancer}</Text> : endEnhancer}
            </View>
          )}
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </>
    );
  },
);

Input.defaultProps = {
  disabled: false,
  error: undefined,
  handleInputRef: undefined,
  index: 0,
  startEnhancer: undefined,
  endEnhancer: undefined,
  testId: undefined,
  textAlign: 'left',
  isPassword: false,
  label: undefined,
};

export default Input;

import React, { forwardRef } from 'react';
import { View, TextInput, Text, TextInputProps, TextStyle } from 'react-native';

import { useInputStyles } from './input.styles';

export interface InputProps extends Omit<TextInputProps, 'style | multiline'> {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  handleInputRef?: (ref: TextInput) => void;
  startEnhancer?: React.ReactElement | string;
  testId?: string;
  textAlign?: Exclude<TextStyle['textAlign'], 'auto' | 'justify'>;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    { disabled, endEnhancer, handleInputRef, startEnhancer, testId, textAlign = 'left', ...props },
    ref,
  ) => {
    const styles = useInputStyles();

    return (
      <>
        <View
          style={[
            styles.container,
            styles.defaultBorder,
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
            style={[styles.input, disabled && styles.disabled, textAlign && { textAlign }]}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {endEnhancer && (
            <View style={styles.enhancer}>
              {typeof endEnhancer === 'string' ? <Text>{endEnhancer}</Text> : endEnhancer}
            </View>
          )}
        </View>
      </>
    );
  },
);

Input.defaultProps = {
  disabled: false,
  handleInputRef: undefined,
  startEnhancer: undefined,
  endEnhancer: undefined,
  testId: undefined,
  textAlign: 'left',
};

export default Input;

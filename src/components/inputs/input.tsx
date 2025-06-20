import React, { forwardRef } from 'react';
import { View, TextInput, Text } from 'react-native';

import { InputProps, KeyboardTypes } from '../../types';

import { useInputStyles } from './input.styles';

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      disabled,
      endEnhancer,
      keyboardType = KeyboardTypes.DEFAULT,
      handleInputRef,
      startEnhancer,
      testId,
      textAlign = 'left',
      ...props
    },
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
            keyboardType={keyboardType}
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

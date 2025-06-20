import { Text } from 'native-base';
import React, { forwardRef } from 'react';
import { TextInput, View } from 'react-native';

import { KeyboardTypes, TextAreaInputProps } from '../../types';

import { useTextAreaInputStyles } from './input.styles';

const TextAreaInput = forwardRef<TextInput | null, TextAreaInputProps>(
  (
    {
      disabled,
      testId,
      startEnhancer,
      endEnhancer,
      keyboardType = KeyboardTypes.DEFAULT,
      handleInputRef,
      textAlign,
      numberOfLines,
      ...props
    },
    ref,
  ) => {
    const styles = useTextAreaInputStyles();

    return (
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
            } else if (ref && typeof ref === 'object') {
              ref.current = input;
            }
          }}
          editable={!disabled}
          style={[styles.input, disabled && styles.disabled, textAlign && { textAlign }]}
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          keyboardType={keyboardType}
        />
        {endEnhancer && (
          <View style={styles.enhancer}>
            {typeof endEnhancer === 'string' ? <Text>{endEnhancer}</Text> : endEnhancer}
          </View>
        )}
      </View>
    );
  },
);

TextAreaInput.defaultProps = {
  disabled: false,
  handleInputRef: undefined,
  startEnhancer: undefined,
  endEnhancer: undefined,
  testId: undefined,
  textAlign: 'left',
  numberOfLines: 4,
};

export default TextAreaInput;

import { Text } from 'native-base';
import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, TextStyle, View } from 'react-native';

import { useTextAreaInputStyles } from './input.styles';

interface TextAreaInputProps extends Omit<TextInputProps, 'style | multiline'> {
  disabled?: boolean;
  endEnhancer?: React.ReactElement | string;
  handleInputRef?: (ref: TextInput) => void;
  startEnhancer?: React.ReactElement | string;
  testId?: string;
  textAlign?: Exclude<TextStyle['textAlign'], 'auto' | 'justify'>;
  numberOfLines?: number;
}

const TextAreaInput = forwardRef<TextInput | null, TextAreaInputProps>(
  (
    {
      disabled,
      testId,
      startEnhancer,
      endEnhancer,
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

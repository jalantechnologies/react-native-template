import { Text, useTheme } from 'native-base';
import React, { forwardRef, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, View } from 'react-native';

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
      label,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const styles = useTextAreaInputStyles();
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };
    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    return (
      <View style={styles.wrapper}>
        {label && (
          <Text
            style={[
              styles.label,
              { color: disabled ? theme.colors.secondary[500] : theme.colors.secondary[900] },
            ]}
          >
            {label}
          </Text>
        )}
        <View
          style={[
            styles.container,
            styles.defaultBorder,
            isFocused ? styles.focusedBorder : {},
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
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor={
              disabled ? theme.colors.secondary[500] : theme.colors.secondary[600]
            }
          />
          {endEnhancer && (
            <View style={styles.enhancer}>
              {typeof endEnhancer === 'string' ? <Text>{endEnhancer}</Text> : endEnhancer}
            </View>
          )}
        </View>
      </View>
    );
  },
);

export default TextAreaInput;

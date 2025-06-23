import React, { forwardRef, useEffect, useState } from 'react';
import { View, TextInput, Text, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { InputProps, InputStatus, KeyboardTypes } from '../../types';

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
      status = InputStatus.DEFAULT,
      message = '',
      label,
      onChangeText,
      ...props
    },
    ref,
  ) => {
    const styles = useInputStyles();
    const [isFocused, setIsFocused] = useState(false);
    const [showMsg, setShowMsg] = useState(status === 'error' || status === 'success');

    useEffect(() => {
      if (status === InputStatus.ERROR || status === InputStatus.SUCCESS) {
        setShowMsg(true);
      } else {
        setShowMsg(false);
      }
    }, [status]);

    const getBorderColor = () => {
      if (status === InputStatus.ERROR) {
        return styles.errorBorder;
      }
      if (status === InputStatus.SUCCESS) {
        return styles.successBorder;
      }
      return styles.defaultBorder;
    };

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      props.onBlur?.(e);
    };

    const handleChangeText = (text: string) => {
      if (text === '') {
        setShowMsg(false);
      }
      onChangeText?.(text);
    };

    return (
      <>
        <View style={styles.wrapper}>
          {label && <Text style={styles.label}>{label}</Text>}

          <View
            style={[
              styles.container,
              getBorderColor(),
              isFocused && (status === InputStatus.DEFAULT ? styles.focusedBorder : {}),
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
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChangeText={handleChangeText}
            />

            {endEnhancer && (
              <View style={styles.enhancer}>
                {typeof endEnhancer === 'string' ? <Text>{endEnhancer}</Text> : endEnhancer}
              </View>
            )}
          </View>

          {showMsg && !!message && (
            <Text
              style={status === InputStatus.ERROR ? styles.errorMessage : styles.successMessage}
            >
              {message}
            </Text>
          )}
        </View>
      </>
    );
  },
);

export default Input;

import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput as PaperTextInput, useTheme } from 'react-native-paper';

import { KeyboardKeys } from '../../constants';

interface OTPInputProps {
  length: number;
  otp: string[];
  setOtp: (otp: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, otp, setOtp }) => {
  const theme = useTheme();
  const inputsRef = useRef<Array<React.ComponentRef<typeof PaperTextInput> | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const focusNextInput = (index: number) => {
    const nextInput = inputsRef.current[index + 1];
    if (nextInput && typeof nextInput.focus === 'function') {
      nextInput.focus();
    }
  };

  const focusPreviousInput = (index: number) => {
    const previousInput = inputsRef.current[index - 1];
    if (previousInput && typeof previousInput.focus === 'function') {
      previousInput.focus();
    }
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      focusNextInput(index);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === KeyboardKeys.BACKSPACE && index > 0 && otp[index] === '') {
      focusPreviousInput(index);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
    },
    inputWrapper: {
      flex: 1,
      marginHorizontal: 8,
    },
    input: {
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {Array(length)
        .fill('')
        .map((_, index) => (
          <View key={index} style={styles.inputWrapper}>
            <PaperTextInput
              ref={(el: React.ComponentRef<typeof PaperTextInput> | null) => (inputsRef.current[index] = el)}
              mode="outlined"
              value={otp[index]}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              dense
              outlineColor={focusedIndex === index ? theme.colors.primary : theme.colors.outline}
              activeOutlineColor={theme.colors.primary}
              style={styles.input}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
            />
          </View>
        ))}
    </View>
  );
};

export default OTPInput;

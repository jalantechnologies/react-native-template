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

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus?.();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === KeyboardKeys.BACKSPACE && index > 0 && otp[index] === '') {
      inputsRef.current[index - 1]?.focus?.();
    }
  };

  const outline = theme.colors.outline;
  const activeOutline = theme.colors.primary;
  const bg = theme.colors.background;
  const horizontalGap = 8;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
    },
    inputWrapper: {
      flex: 1,
      marginHorizontal: horizontalGap,
    },
    input: {
      backgroundColor: bg,
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
              outlineColor={focusedIndex === index ? activeOutline : outline}
              activeOutlineColor={activeOutline}
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

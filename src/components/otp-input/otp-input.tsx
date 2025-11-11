import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { MD3Theme, TextInput as PaperTextInput, useTheme } from 'react-native-paper';

import { KeyboardKeys } from '../../constants';

interface OTPInputProps {
  length: number;
  otp: string[];
  setOtp: (otp: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, otp, setOtp }) => {
  const inputsRef = useRef<Array<React.ComponentRef<typeof PaperTextInput> | null>>([]);
  const theme = useTheme();
  const styles = useStyles(theme);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.slice(-1);
    setOtp(newOtp);

    if (!text && index > 0) {
      inputsRef.current[index - 1]?.focus();
      return;
    }

    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === KeyboardKeys.BACKSPACE && index > 0 && otp[index] === '') {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array(length)
        .fill('')
        .map((_, index) => (
          <PaperTextInput
            key={index}
            ref={(input: React.ComponentRef<typeof PaperTextInput> | null) => {
              inputsRef.current[index] = input;
            }}
            contentStyle={styles.inputContent}
            keyboardType="number-pad"
            maxLength={1}
            mode="outlined"
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
            style={styles.input}
            value={otp[index]}
          />
        ))}
    </View>
  );
};

export default OTPInput;

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row' as const,
      width: '100%',
    },
    input: {
      flex: 1,
      marginHorizontal: theme.roundness,
    },
    inputContent: {
      textAlign: 'center' as const,
    },
  });

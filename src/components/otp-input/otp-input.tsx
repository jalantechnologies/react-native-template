import React, { useRef, useState } from 'react';
import { View, TextInput as RNTextInput } from 'react-native';
import { TextInput as PaperTextInput, useTheme } from 'react-native-paper';

import { KeyboardKeys } from '../../constants';

interface OTPInputProps {
  length: number;
  otp: string[];
  setOtp: (otp: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, otp, setOtp }) => {
  const theme = useTheme();
  const inputsRef = useRef<Array<RNTextInput | null>>([]);
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

  return (
    <View style={{ flexDirection: 'row', width: '100%' }}>
      {Array(length)
        .fill('')
        .map((_, index) => (
          <View key={index} style={{ flex: 1, marginHorizontal: 4 }}>
            <PaperTextInput
              ref={(el: any) => (inputsRef.current[index] = el)}
              mode="outlined"
              value={otp[index]}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              dense
              outlineColor={focusedIndex === index ? activeOutline : outline}
              activeOutlineColor={activeOutline}
              style={{ backgroundColor: bg }}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
            />
          </View>
        ))}
    </View>
  );
};

export default OTPInput;

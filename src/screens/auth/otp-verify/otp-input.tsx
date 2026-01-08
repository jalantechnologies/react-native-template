import React, { useRef } from 'react';
import { View, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { TextInput } from 'react-native-paper';

import { useOtpFormStyles } from './otp-form.styles';

import { useAppTheme } from '@/theme';
interface PaperOTPInputProps {
    length: number;
    value: string[];
    onChange: (otp: string[]) => void;
}

const PaperOTPInput: React.FC<PaperOTPInputProps> = ({
    length,
    value,
    onChange,
}) => {
    const inputs = useRef<Array<React.ElementRef<typeof TextInput> | null>>([]);

    const handleChange = (text: string, index: number) => {
        const digit = text.replace(/[^0-9]/g, '').slice(-1);
        const newOtp = [...value];
        newOtp[index] = digit;
        onChange(newOtp);

        if (digit && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };
    const styles = useOtpFormStyles();
    const theme = useAppTheme();

    return (
    <View style={styles.containerOtp}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(el: React.ElementRef<typeof TextInput> | null) => {
            inputs.current[index] = el;
          }}
          mode="outlined"
          keyboardType="number-pad"
          maxLength={1}
          value={value[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          activeOutlineColor={theme.colors.primaryContainer}
          style={styles.input}
          autoFocus={index === 0}
        />
      ))}
    </View>
    );
};

export default PaperOTPInput;

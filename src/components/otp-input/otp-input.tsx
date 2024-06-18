import { Input } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import tw from '../../lib/tailwind';

interface OTPInputProps {
  onChange: (otp: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ onChange }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.charAt(text.length - 1);
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChange(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={tw`flex-row justify-between items-center gap-4`}>
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(ref: TextInput) => (inputs.current[index] = ref!)}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(digit, index);
            }
          }}
          keyboardType="numeric"
          maxLength={1}
          containerStyle={tw`flex-1 px-0`}
          inputStyle={tw`text-center`}
          errorStyle={tw`hidden`}
        />
      ))}
    </View>
  );
};

export default OTPInput;

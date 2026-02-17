import React, { useRef } from 'react';
import { TextInput as RNTextInput, StyleSheet, Text, View } from 'react-native';
import { Button, TouchableRipple, useTheme } from 'react-native-paper';

import { AuthOptions } from '../../../constants';
import { AsyncError } from '../../../types';
import useOTPForm from './otp-form-hook';

interface OTPFormProps {
  countryCode: string;
  isResendEnabled: boolean;
  onError: (err: AsyncError) => void;
  onResendOTPSuccess: () => void;
  onVerifyOTPSuccess: () => void;
  phoneNumber: string;
  remainingSecondsStr: string;
}

const OTPForm: React.FC<OTPFormProps> = ({
  countryCode,
  isResendEnabled,
  onError,
  onResendOTPSuccess,
  onVerifyOTPSuccess,
  phoneNumber,
  remainingSecondsStr,
}) => {
  const theme = useTheme() as any;
  const { formik, handleResendOTP, isVerifyOTPLoading } = useOTPForm({
    onError,
    onResendOTPSuccess,
    onVerifyOTPSuccess,
    countryCode,
    phoneNumber,
  });

  const inputs = useRef<RNTextInput[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...formik.values.otp];
    newOtp[index] = value;
    formik.setFieldValue('otp', newOtp);

    if (value && index < AuthOptions.OTPLength - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !formik.values.otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.heading, { fontSize: 32, fontWeight: 'bold' }]}>Verify OTP</Text>
        
        <View style={styles.otpSection}>
          <Text style={[styles.label, { fontSize: 14 }]}>
            Enter your otp sent to your mobile number
          </Text>
          
          <View style={styles.otpInputRow}>
            {Array.from({ length: AuthOptions.OTPLength }).map((_, index) => (
              <RNTextInput
                key={index}
                ref={el => (inputs.current[index] = el!)}
                style={[
                  styles.otpBox,
                  { borderColor: theme.colors.outline }
                ]}
                maxLength={1}
                keyboardType="numeric"
                value={formik.values.otp[index]}
                onChangeText={v => handleOtpChange(v, index)}
                onKeyPress={e => handleKeyPress(e, index)}
              />
            ))}
          </View>
          
          <View style={styles.resendRow}>
            <Text style={{ fontSize: 12 }}>Didn't receive the OTP? </Text>
            <TouchableRipple
              onPress={isResendEnabled ? handleResendOTP : undefined}
              disabled={!isResendEnabled}
            >
              <Text
                style={[
                  styles.resendLink,
                  { color: isResendEnabled ? theme.colors.primary : theme.colors.onSurfaceVariant }
                ]}
              >
                {isResendEnabled ? 'Resend OTP' : `Resend OTP in 00:${remainingSecondsStr}`}
              </Text>
            </TouchableRipple>
          </View>
        </View>
      </View>

      <Button
        mode="contained"
        loading={isVerifyOTPLoading}
        onPress={() => formik.handleSubmit()}
        disabled={!(formik.isValid && formik.dirty)}
        style={styles.submitButton}
      >
        Verify OTP
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  content: {
    flex: 1,
  },
  heading: {
    marginBottom: 24,
  },
  otpSection: {
    marginTop: 12,
  },
  label: {
    marginBottom: 16,
  },
  otpInputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: 'white',
  },
  resendRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 8,
  },
  resendLink: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 'auto',
  },
});

export default OTPForm;

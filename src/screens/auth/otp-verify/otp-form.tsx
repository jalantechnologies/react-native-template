import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button as PaperButton, Text, useTheme } from 'react-native-paper';

import { OTPInput } from '../../../components';
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
  const { formik, handleResendOTP, isVerifyOTPLoading } = useOTPForm({
    onError,
    onResendOTPSuccess,
    onVerifyOTPSuccess,
    countryCode,
    phoneNumber,
  });

  const handleSetOtp = (otp: string[]) => {
    formik.setFieldValue('otp', otp);
  };

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    inputWrapper: {
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text variant="titleLarge">Verify OTP</Text>
        </View>
        <View>
          <Text variant="labelLarge">Enter your otp sent to your mobile number</Text>
          <View style={styles.inputWrapper}>
            <OTPInput
              length={AuthOptions.OTPLength}
              otp={formik.values.otp}
              setOtp={handleSetOtp}
            />
          </View>
          <Text>
            Didn't receive the OTP?{' '}
            <Text
              style={{
                color: isResendEnabled ? theme.colors.primary : theme.colors.onSurfaceVariant,
                textDecorationLine: isResendEnabled ? 'underline' : 'none',
              }}
              onPress={handleResendOTP}
            >
              {isResendEnabled ? 'Resend OTP' : `Resend OTP in 00:${remainingSecondsStr}`}
            </Text>
          </Text>
        </View>
      </View>

      <PaperButton
        mode="contained"
        loading={isVerifyOTPLoading}
        onPress={() => formik.handleSubmit()}
        disabled={!(formik.isValid && formik.dirty)}
      >
        Verify OTP
      </PaperButton>
    </View>
  );
};

export default OTPForm;

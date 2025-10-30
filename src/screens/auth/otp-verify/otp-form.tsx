import React from 'react';
import { View } from 'react-native';
import { Button as PaperButton, Text, useTheme } from 'react-native-paper';

import { FormControl, OTPInput } from '../../../components';
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

  const theme = useTheme();
  const primary = theme.colors.primary;
  const onPrimary = theme.colors.onPrimary;
  const muted = theme.colors.onSurfaceVariant;
  const radius = (theme as any).roundness ?? 6;

  const handleSetOtp = (otp: string[]) => {
    formik.setFieldValue('otp', otp);
  };

  return (
    <View style={{ flex: 1, paddingBottom: 16 }}>
      <View style={{ flex: 1, marginBottom: 32 }}>
        <View>
          <Text variant="titleLarge">Verify OTP</Text>
        </View>
        <View style={{ marginTop: 12 }}>
          <FormControl label="Enter your otp sent to your mobile number">
            <View style={{ alignItems: 'center' }}>
              <OTPInput
                length={AuthOptions.OTPLength}
                otp={formik.values.otp}
                setOtp={handleSetOtp}
              />
            </View>
          </FormControl>
          <Text style={{ fontSize: 12, lineHeight: 18, marginTop: 8 }}>
            Didn't receive the OTP?{' '}
            <Text
              style={{
                fontSize: 12,
                lineHeight: 16,
                color: isResendEnabled ? primary : muted,
                textDecorationLine: isResendEnabled ? 'underline' : 'none',
              }}
              onPress={handleResendOTP}
            >
              {isResendEnabled
                ? 'Resend OTP'
                : `Resend OTP in 00:${remainingSecondsStr}`}
            </Text>
          </Text>
        </View>
      </View>

      <PaperButton
        mode="contained"
        buttonColor={primary}
        textColor={onPrimary}
        loading={isVerifyOTPLoading}
        onPress={() => formik.handleSubmit()}
        disabled={!(formik.isValid && formik.dirty)}
        style={{ borderRadius: radius }}
      >
        Verify OTP
      </PaperButton>
    </View>
  );
};

export default OTPForm;

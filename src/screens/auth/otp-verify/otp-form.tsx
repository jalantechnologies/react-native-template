import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  useTheme,
} from 'react-native-paper';

import { OTPInput } from '../../../components';
import { AuthOptions } from '../../../constants';
import { AsyncError, PhoneNumber } from '../../../types';

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
    countryCode,
    onError,
    onResendOTPSuccess,
    onVerifyOTPSuccess,
    phoneNumber,
  });
  const { colors } = useTheme();

  const formattedDisplayNumber = new PhoneNumber({
    country_code: countryCode.replace('+', ''),
    phone_number: phoneNumber,
  }).getFormattedPhoneNumber();

  const handleSetOtp = (otp: string[]) => {
    formik.setFieldValue('otp', otp);
  };

  return (
    <View style={styles.container}>
      <View style={styles.copyWrapper}>
        <Text style={[styles.title, { color: colors.onSurface }]} variant="titleLarge">
          Verify OTP
        </Text>
        <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]} variant="bodyMedium">
          Enter the verification code received on {formattedDisplayNumber}
        </Text>
      </View>

      <View style={styles.otpWrapper}>
        <OTPInput length={AuthOptions.OTPLength} otp={formik.values.otp} setOtp={handleSetOtp} />
      </View>

      <Text style={[styles.resendCopy, { color: colors.onSurfaceVariant }]} variant="bodySmall">
        Didn’t receive the OTP?{' '}
        <Text
          style={[
            styles.resendLink,
            { color: isResendEnabled ? colors.primary : colors.onSurfaceVariant },
          ]}
          onPress={isResendEnabled ? handleResendOTP : undefined}
        >
          {isResendEnabled ? 'Resend OTP' : `Resend OTP in 00:${remainingSecondsStr}`}
        </Text>
      </Text>

      <Button
        buttonColor={colors.primary}
        contentStyle={styles.submitButtonContent}
        disabled={!(formik.isValid && formik.dirty)}
        loading={isVerifyOTPLoading}
        mode="contained"
        onPress={() => formik.handleSubmit()}
        style={styles.submitButton}
        uppercase={false}
      >
        Verify OTP
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 24,
  },
  copyWrapper: {
    alignItems: 'flex-start',
    marginBottom: 24,
    width: '100%',
  },
  otpWrapper: {
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  resendCopy: {
    lineHeight: 20,
    marginBottom: 24,
  },
  resendLink: {
    fontWeight: '600',
  },
  submitButton: {
    borderRadius: 24,
    marginTop: 'auto',
    width: '100%',
  },
  submitButtonContent: {
    height: 52,
  },
  subtitle: {
    lineHeight: 20,
  },
  title: {
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'left',
  },
});

export default OTPForm;

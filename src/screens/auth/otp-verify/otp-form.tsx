import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

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
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'space-between' as const,
        },
        header: {
          flexGrow: 1,
          rowGap: theme.roundness,
        },
        otpInputContainer: {
          marginTop: theme.roundness,
        },
        resendLink: {
          textDecorationLine: 'underline' as const,
        },
        resendActive: {
          color: theme.colors.primary,
        },
        resendDisabled: {
          color: theme.colors.onSurfaceDisabled,
        },
      }),
    [theme.colors.onSurfaceDisabled, theme.colors.primary, theme.roundness],
  );
  const resendLabel = isResendEnabled ? 'Resend OTP' : `Resend OTP in 00:${remainingSecondsStr}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">Verify OTP</Text>
        <Text variant="bodyMedium">Enter the OTP sent to your mobile number</Text>
        <View style={styles.otpInputContainer}>
          <OTPInput
            length={AuthOptions.OTPLength}
            otp={formik.values.otp}
            setOtp={handleSetOtp}
          />
        </View>
        <Text variant="bodySmall">
          Didn’t receive the OTP?{' '}
          <Text
            onPress={isResendEnabled ? handleResendOTP : undefined}
            style={[
              styles.resendLink,
              isResendEnabled ? styles.resendActive : styles.resendDisabled,
            ]}
            variant="bodySmall"
          >
            {resendLabel}
          </Text>
        </Text>
      </View>
      <Button
        disabled={!(formik.isValid && formik.dirty)}
        loading={isVerifyOTPLoading}
        mode="contained"
        onPress={() => formik.handleSubmit()}
      >
        Verify OTP
      </Button>
    </View>
  );
};

export default OTPForm;

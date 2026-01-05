import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import { AuthOptions } from '../../../constants';
import { AsyncError } from '../../../types';

import useOTPForm from './otp-form-hook';
import { useOtpFormStyles } from './otp-form.styles';
import PaperOTPInput from './otp-input';
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
  const styles = useOtpFormStyles();

  return (
    <View style={styles.container}>
      <View >
        <Text variant="titleLarge">Verify OTP</Text>

        <Text variant="bodySmall" style={styles.label}>
          Enter the OTP sent to your mobile number
        </Text>

        <PaperOTPInput
          length={AuthOptions.OTPLength}
          value={formik.values.otp}
          onChange={(otp) => formik.setFieldValue('otp', otp)}
        />

        <View style={styles.resendRow}>
          <Text variant="bodySmall">Didn't receive the OTP? </Text>
          <Text
            variant="bodySmall"
            style={[
              styles.resend,
              !isResendEnabled && styles.resendDisabled,

            ]}
            onPress={isResendEnabled ? handleResendOTP : undefined}
          >
            {isResendEnabled
              ? 'Resend OTP'
              : `Resend OTP in 00:${remainingSecondsStr}`}
          </Text>
        </View>
      </View>

      <Button
        mode="contained"
        loading={isVerifyOTPLoading}
        onPress={() => formik.handleSubmit()}
        disabled={!(formik.isValid && formik.dirty)}
      >
        Verify OTP
      </Button>
    </View>
  );
};

export default OTPForm;

import React from 'react';
import { StyleSheet, View } from 'react-native';
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
  const radius = (theme as any).roundness;
  const spacing = (theme as any).spacing;
  const fontSizes = (theme as any).fonts?.fontSize;
  const lineHeights = (theme as any).fonts?.lineHeight;

  const handleSetOtp = (otp: string[]) => {
    formik.setFieldValue('otp', otp);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: spacing.lg,
    },
    content: {
      flex: 1,
      marginBottom: spacing.xl,
    },
    titleSection: {
      marginTop: spacing.md,
    },
    inputWrapper: {
      alignItems: 'center',
    },
    resendText: {
      fontSize: fontSizes?.xs,
      lineHeight: lineHeights?.sm,
      marginTop: spacing.sm,
    },
    resendLink: {
      fontSize: fontSizes?.xs,
      lineHeight: lineHeights?.xs,
      color: isResendEnabled ? primary : muted,
      textDecorationLine: isResendEnabled ? 'underline' : 'none',
    },
    button: {
      borderRadius: radius,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text variant="titleLarge">Verify OTP</Text>
        </View>
        <View style={styles.titleSection}>
          <FormControl label="Enter your otp sent to your mobile number">
            <View style={styles.inputWrapper}>
              <OTPInput
                length={AuthOptions.OTPLength}
                otp={formik.values.otp}
                setOtp={handleSetOtp}
              />
            </View>
          </FormControl>
          <Text style={styles.resendText}>
            Didn't receive the OTP?{' '}
            <Text style={styles.resendLink} onPress={handleResendOTP}>
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
        style={styles.button}
      >
        Verify OTP
      </PaperButton>
    </View>
  );
};

export default OTPForm;

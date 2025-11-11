import React, { useState } from 'react';
import { Snackbar, useTheme } from 'react-native-paper';

import { MainScreenProps } from '../../../../@types/navigation';
import type { AppTheme } from '../../../theme/app-theme';
import { AsyncError } from '../../../types';
import useTimer from '../../../utils/use-timer.hook';
import AuthLayout from '../auth-layout';

import OTPForm from './otp-form';

const OTPVerify: React.FC<MainScreenProps<'OTPVerify'>> = ({ route }) => {
  const { countryCode, phoneNumber } = route.params;
  const sendOTPDelayInMilliseconds = 60_000;

  const theme = useTheme<AppTheme>();
  const { startTimer, remainingSecondsStr, isResendEnabled } = useTimer({
    delayInMilliseconds: sendOTPDelayInMilliseconds,
  });

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const showMessage = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const onError = (error: AsyncError) => {
    showMessage(error.message);
  };

  const onResendOTPSuccess = () => {
    startTimer();
  };

  const onVerifyOTPSuccess = () => {
    showMessage('OTP verified successfully');
  };

  return (
    <AuthLayout primaryTitle="Better." secondaryTitle="">
      <OTPForm
        countryCode={countryCode}
        isResendEnabled={isResendEnabled}
        onError={onError}
        onResendOTPSuccess={onResendOTPSuccess}
        onVerifyOTPSuccess={onVerifyOTPSuccess}
        phoneNumber={phoneNumber}
        remainingSecondsStr={remainingSecondsStr}
      />
      <Snackbar
        duration={theme.overlay.snackbarDuration}
        onDismiss={() => setSnackbarVisible(false)}
        visible={snackbarVisible}
      >
        {snackbarMessage}
      </Snackbar>
    </AuthLayout>
  );
};

export default OTPVerify;

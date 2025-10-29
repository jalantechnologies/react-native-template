import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Snackbar } from 'react-native-paper';

import { MainScreenProps } from '../../../../@types/navigation';
import { AsyncError } from '../../../types';
import useTimer from '../../../utils/use-timer.hook';
import AuthLayout from '../auth-layout';

import OTPForm from './otp-form';

const OTPVerify: React.FC<MainScreenProps<'OTPVerify'>> = ({ route }) => {
  const { countryCode, phoneNumber } = route.params;
  const flashMessage = (route.params as any)?.flashMessage as string | undefined;
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const sendOTPDelayInMilliseconds = 60_000;

  const { startTimer, remainingSecondsStr, isResendEnabled } = useTimer({
    delayInMilliseconds: sendOTPDelayInMilliseconds,
  });

  const onError = (error: AsyncError) => {
    Alert.alert('Error', error.message);
  };

  const onResendOTPSuccess = () => {
    startTimer();
  };

  const onVerifyOTPSuccess = () => {
    setSnackbarMessage('OTP verified successfully');
    setSnackbarVisible(true);
  };

  useEffect(() => {
    if (flashMessage) {
      setSnackbarMessage(flashMessage);
      setSnackbarVisible(true);
    }
  }, [flashMessage]);

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
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={6000}
      >
        {snackbarMessage}
      </Snackbar>
    </AuthLayout>
  );
};

export default OTPVerify;

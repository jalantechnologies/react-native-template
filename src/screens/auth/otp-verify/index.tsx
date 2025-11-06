import React, { useState } from 'react';
import { Portal, Snackbar } from 'react-native-paper';

import { MainScreenProps } from '../../../../@types/navigation';
import { AsyncError } from '../../../types';
import useTimer from '../../../utils/use-timer.hook';
import AuthLayout from '../auth-layout';

import OTPForm from './otp-form';

const OTPVerify: React.FC<MainScreenProps<'OTPVerify'>> = ({ route }) => {
  const { countryCode, phoneNumber } = route.params;
  const sendOTPDelayInMilliseconds = 60_000;

  const { startTimer, remainingSecondsStr, isResendEnabled } = useTimer({
    delayInMilliseconds: sendOTPDelayInMilliseconds,
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);

  const onError = (error: AsyncError) => {
    setErrorMessage(error.message);
    setErrorVisible(true);
  };

  const onResendOTPSuccess = () => {
    startTimer();
  };

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const onVerifyOTPSuccess = () => {
    setSnackbarVisible(true);
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
      <Portal>
        <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)}>
          OTP verified successfully
        </Snackbar>
        <Snackbar visible={errorVisible} onDismiss={() => setErrorVisible(false)}>
          {errorMessage}
        </Snackbar>
      </Portal>
    </AuthLayout>
  );
};

export default OTPVerify;

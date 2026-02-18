import React from 'react';

import { MainScreenProps } from '../../../../@types/navigation';
import { useToast } from '../../../contexts';
import { AsyncError } from '../../../types';
import useTimer from '../../../utils/use-timer.hook';
import AuthLayout from '../auth-layout';
import OTPForm from './otp-form';

const OTPVerify: React.FC<MainScreenProps<'OTPVerify'>> = ({ route }) => {
  const { countryCode, phoneNumber } = route.params;
  const sendOTPDelayInMilliseconds = 60_000;
  const toast = useToast();

  const { startTimer, remainingSecondsStr, isResendEnabled } = useTimer({
    delayInMilliseconds: sendOTPDelayInMilliseconds,
  });

  const onError = (error: AsyncError) => {
    toast.show(error.message);
  };

  const onResendOTPSuccess = () => {
    startTimer();
  };

  const onVerifyOTPSuccess = () => {
    toast.show('OTP verified successfully');
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
    </AuthLayout>
  );
};

export default OTPVerify;

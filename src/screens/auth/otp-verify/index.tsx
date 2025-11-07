import { Toast } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';

import { MainScreenProps } from '../../../../@types/navigation';
import { AsyncError } from '../../../types';
import useTimer from '../../../utils/use-timer.hook';
import AuthLayout from '../auth-layout';

import OTPForm from './otp-form';

const OTPVerify: React.FC<MainScreenProps<'OTPVerify'>> = ({ route }) => {
  const { countryCode, phoneNumber } = route.params;
  const { t } = useTranslation();
  const sendOTPDelayInMilliseconds = 60_000;

  const { isResendEnabled, remainingSecondsStr, startTimer } = useTimer({
    delayInMilliseconds: sendOTPDelayInMilliseconds,
  });

  const onError = (error: AsyncError) => {
    const message = error.message?.toLowerCase() ?? '';
    const isOTPDeliveryError =
      message.includes('unable to create record') ||
      message.includes('authenticate') ||
      message.includes('twilio') ||
      message.includes('sms');

    const fallbackMessage = error.message ?? t('error:somethingWrong');
    const errorMessage = isOTPDeliveryError ? t('error:otpDeliveryFailure') : fallbackMessage;

    Alert.alert('Error', errorMessage);
  };

  const onResendOTPSuccess = () => {
    startTimer();
  };

  const onVerifyOTPSuccess = () => {
    Toast.show({
      title: 'OTP verified successfully',
    });
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

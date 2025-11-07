import { Toast } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';

import PhoneAuthForm from './phone-auth-form';

const PhoneAuth: React.FC = () => {
  const { t } = useTranslation();

  const onSuccess = () => {
    Toast.show({
      title: 'OTP sent successfully',
    });
  };

  const onError = (err: AsyncError) => {
    const message = err.message?.toLowerCase() ?? '';
    const isOTPDeliveryError =
      message.includes('unable to create record') ||
      message.includes('authenticate') ||
      message.includes('twilio') ||
      message.includes('sms');

    const fallbackMessage = err.message ?? t('error:somethingWrong');
    const errorMessage = isOTPDeliveryError ? t('error:otpDeliveryFailure') : fallbackMessage;

    Toast.show({
      title: errorMessage,
    });
  };

  return (
    <AuthLayout primaryTitle="Better." secondaryTitle="">
      <PhoneAuthForm onSuccess={onSuccess} onError={onError} />
    </AuthLayout>
  );
};

export default PhoneAuth;

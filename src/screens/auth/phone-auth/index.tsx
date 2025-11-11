import { Toast } from 'native-base';
import React from 'react';

import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';

import PhoneAuthForm from './phone-auth-form';

const PhoneAuth: React.FC = () => {
  const onSuccess = () => {
    Toast.show({
      title: 'OTP sent successfully',
    });
  };

  const onError = (err: AsyncError) => {
    Toast.show({
      title: err.message,
    });
  };

  return (
    <AuthLayout primaryTitle="Better." secondaryTitle="">
      <PhoneAuthForm onSuccess={onSuccess} onError={onError} />
    </AuthLayout>
  );
};

export default PhoneAuth;

import React from 'react';

import { useToast } from '../../../contexts';
import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';
import PhoneAuthForm from './phone-auth-form';

const PhoneAuth: React.FC = () => {
  const toast = useToast();

  const onSuccess = () => {
    toast.show('OTP sent successfully');
  };

  const onError = (err: AsyncError) => {
    toast.show(err.message);
  };

  return (
    <AuthLayout primaryTitle="Better." secondaryTitle="">
      <PhoneAuthForm onSuccess={onSuccess} onError={onError} />
    </AuthLayout>
  );
};

export default PhoneAuth;

import React from 'react';
import AuthLayout from '../auth-layout';
import RegistrationForm from './registration-form';
import { Toast } from 'native-base';
import { AsyncError } from '../../../types';

const RegistrationScreen: React.FC = () => {
  const onSuccess = () => {
    Toast.show({
      title: 'Account Created Successfully',
    });
  };

  const onError = (err: AsyncError) => {
    Toast.show({
      title: err.message,
    });
  };
  return (
    <AuthLayout primaryTitle="Create" secondaryTitle="Account">
      <RegistrationForm onError={onError} onSuccess={onSuccess} />
    </AuthLayout>
  );
};

export default RegistrationScreen;

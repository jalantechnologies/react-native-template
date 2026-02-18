import React from 'react';

import { useToast } from '../../../contexts';
import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';
import RegistrationForm from './registration-form';

const RegistrationScreen: React.FC = () => {
  const toast = useToast();

  const onSuccess = () => {
    toast.show('Account Created Successfully');
  };

  const onError = (err: AsyncError) => {
    toast.show(err.message);
  };

  return (
    <AuthLayout primaryTitle="Create" secondaryTitle="Account">
      <RegistrationForm onError={onError} onSuccess={onSuccess} />
    </AuthLayout>
  );
};

export default RegistrationScreen;

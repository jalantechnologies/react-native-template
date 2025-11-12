import { Toast } from 'native-base';
import React from 'react';

import { AuthenticatedStackScreenProps } from '../../../../@types/navigation';
import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';

import RegistrationForm from './registration-form';

const RegistrationScreen: React.FC<AuthenticatedStackScreenProps<'Registration'>> = ({
  navigation,
}) => {
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
    <AuthLayout onBackPress={navigation.goBack} primaryTitle="" secondaryTitle="">
      <RegistrationForm onError={onError} onSuccess={onSuccess} />
    </AuthLayout>
  );
};

export default RegistrationScreen;

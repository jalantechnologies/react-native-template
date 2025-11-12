import { Toast } from 'native-base';
import React from 'react';

import { MainScreenProps } from '../../../../@types/navigation';
import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';

import PhoneAuthForm from './phone-auth-form';

const PhoneAuth: React.FC<MainScreenProps<'PhoneAuth'>> = ({ navigation }) => {
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
    <AuthLayout onBackPress={navigation.goBack} primaryTitle="" secondaryTitle="">
      <PhoneAuthForm onError={onError} onSuccess={onSuccess} />
    </AuthLayout>
  );
};

export default PhoneAuth;

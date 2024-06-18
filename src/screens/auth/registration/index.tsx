import React from 'react';
import AuthLayout from '../auth-layout';
import RegistrationForm from './registration-form';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { AsyncError } from '../../../types';

const Registration: React.FC = () => {
  const navigation = useNavigation();

  const onError = (error: AsyncError) => {
    Alert.alert('Error', error.message);
  };

  const onRegistrationSuccess = () => {
    navigation.navigate('Dashboard');
  };
  return (
    <AuthLayout>
      <RegistrationForm
        onError={onError}
        onRegistrationSuccess={onRegistrationSuccess}
      />
    </AuthLayout>
  );
};

export default Registration;

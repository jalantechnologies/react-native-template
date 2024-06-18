import React from 'react';
import AuthLayout from '../auth-layout';
import SignUpForm from './sign-up-form';
import { Alert, Platform, ToastAndroid } from 'react-native';
import { AsyncError } from '../../../types';

const SignUp: React.FC = () => {
  const onError = (error: AsyncError) => {
    Alert.alert('Error', error.message);
  };

  const onSendOTPSuccess = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show('OTP Sent', ToastAndroid.SHORT);
    } else {
      Alert.alert('OTP Sent');
    }
  };

  return (
    <AuthLayout>
      <SignUpForm onError={onError} onSendOTPSuccess={onSendOTPSuccess} />
    </AuthLayout>
  );
};

export default SignUp;

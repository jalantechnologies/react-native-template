import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';

import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';

import PhoneAuthForm from './phone-auth-form';

const PhoneAuth: React.FC = () => {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleDismissSnackbar = () => {
    setIsSnackbarVisible(false);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setIsSnackbarVisible(true);
  };

  const onSuccess = () => {
    showSnackbar('OTP sent successfully');
  };

  const onError = (error: AsyncError) => {
    showSnackbar(error.message);
  };

  return (
    <>
      <AuthLayout primaryTitle="Better." secondaryTitle="">
        <PhoneAuthForm onError={onError} onSuccess={onSuccess} />
      </AuthLayout>
      <Snackbar duration={3000} onDismiss={handleDismissSnackbar} visible={isSnackbarVisible}>
        {snackbarMessage}
      </Snackbar>
    </>
  );
};

export default PhoneAuth;

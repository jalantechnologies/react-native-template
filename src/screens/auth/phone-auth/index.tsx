import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';

import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';

import PhoneAuthForm from './phone-auth-form';

const PhoneAuth: React.FC = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onSuccess = () => {
    setSnackbarMessage('OTP sent successfully');
    setSnackbarVisible(true);
  };

  const onError = (err: AsyncError) => {
    setSnackbarMessage(err.message);
    setSnackbarVisible(true);
  };

  return (
    <AuthLayout primaryTitle="Better." secondaryTitle="">
      <PhoneAuthForm onSuccess={onSuccess} onError={onError} />
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
      >
        {snackbarMessage}
      </Snackbar>
    </AuthLayout>
  );
};

export default PhoneAuth;

import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';

import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';

import PhoneAuthForm from './phone-auth-form';

const PhoneAuth: React.FC = () => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const showMessage = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const onSuccess = () => {
    showMessage('OTP sent successfully');
  };

  const onError = (err: AsyncError) => {
    showMessage(err.message);
  };

  return (
    <AuthLayout primaryTitle="Better." secondaryTitle="">
      <PhoneAuthForm onSuccess={onSuccess} onError={onError} />
      <Snackbar
        duration={3000}
        onDismiss={() => setSnackbarVisible(false)}
        visible={snackbarVisible}
      >
        {snackbarMessage}
      </Snackbar>
    </AuthLayout>
  );
};

export default PhoneAuth;

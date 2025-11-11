import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';

import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';

import RegistrationForm from './registration-form';

const RegistrationScreen: React.FC = () => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  const showMessage = (message: string) => {
    setSnackbarMessage(message);
    setIsSnackbarVisible(true);
  };

  const onSuccess = () => {
    showMessage('Account Created Successfully');
  };

  const onError = (err: AsyncError) => {
    showMessage(err.message);
  };
  return (
    <AuthLayout primaryTitle="Create" secondaryTitle="Account">
      <RegistrationForm onError={onError} onSuccess={onSuccess} />
      <Snackbar duration={3000} onDismiss={() => setIsSnackbarVisible(false)} visible={isSnackbarVisible}>
        {snackbarMessage}
      </Snackbar>
    </AuthLayout>
  );
};

export default RegistrationScreen;

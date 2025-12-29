import React, { useState } from 'react';
import { Snackbar } from 'react-native-paper';

import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';
import RegistrationForm from './registration-form';

const RegistrationScreen: React.FC = () => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onSuccess = () => {
    setSnackbarMessage('Account Created Successfully');
    setSnackbarVisible(true);
  };

  const onError = (err: AsyncError) => {
    setSnackbarMessage(err.message);
    setSnackbarVisible(true);
  };

  return (
    <>
      <AuthLayout primaryTitle="Create" secondaryTitle="Account">
        <RegistrationForm onError={onError} onSuccess={onSuccess} />
      </AuthLayout>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
      >
        {snackbarMessage}
      </Snackbar>
    </>
  );
};

export default RegistrationScreen;

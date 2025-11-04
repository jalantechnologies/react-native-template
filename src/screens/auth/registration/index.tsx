import React, { useState } from 'react';
import { Portal, Snackbar, useTheme } from 'react-native-paper';

import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';

import RegistrationForm from './registration-form';

const RegistrationScreen: React.FC = () => {
  const theme = useTheme();
  const duration = (theme as any).duration;

  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSuccess = () => {
    setSuccessVisible(true);
  };

  const onError = (err: AsyncError) => {
    setErrorMessage(err.message);
    setErrorVisible(true);
  };
  return (
    <AuthLayout primaryTitle="Create" secondaryTitle="Account">
      <RegistrationForm onError={onError} onSuccess={onSuccess} />
      <Portal>
        <Snackbar visible={successVisible} onDismiss={() => setSuccessVisible(false)} duration={duration.snackbar.success}>
          Account Created Successfully
        </Snackbar>
        <Snackbar visible={errorVisible} onDismiss={() => setErrorVisible(false)} duration={duration.snackbar.error}>
          {errorMessage}
        </Snackbar>
      </Portal>
    </AuthLayout>
  );
};

export default RegistrationScreen;

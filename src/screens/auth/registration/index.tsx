import React, { useState } from 'react';
import { Snackbar, useTheme } from 'react-native-paper';

import type { AppTheme } from '../../../theme/app-theme';
import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';

import RegistrationForm from './registration-form';

const RegistrationScreen: React.FC = () => {
  const theme = useTheme<AppTheme>();
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
      <Snackbar
        duration={theme.overlay.snackbarDuration}
        onDismiss={() => setIsSnackbarVisible(false)}
        visible={isSnackbarVisible}
      >
        {snackbarMessage}
      </Snackbar>
    </AuthLayout>
  );
};

export default RegistrationScreen;

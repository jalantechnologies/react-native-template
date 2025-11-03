import React, { useState } from 'react';
import { Portal, Snackbar } from 'react-native-paper';

import { AsyncError } from '../../../types';
import AuthLayout from '../auth-layout';

import PhoneAuthForm from './phone-auth-form';

const PhoneAuth: React.FC = () => {
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
    <AuthLayout primaryTitle="Better." secondaryTitle="">
      <PhoneAuthForm onSuccess={onSuccess} onError={onError} />
      <Portal>
        <Snackbar visible={successVisible} onDismiss={() => setSuccessVisible(false)} duration={3000}>
          OTP sent successfully
        </Snackbar>
        <Snackbar visible={errorVisible} onDismiss={() => setErrorVisible(false)} duration={4000}>
          {errorMessage}
        </Snackbar>
      </Portal>
    </AuthLayout>
  );
};

export default PhoneAuth;

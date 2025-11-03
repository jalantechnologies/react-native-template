import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Portal, Snackbar, Text, useTheme } from 'react-native-paper';

import { MainScreenProps } from '../../../../@types/navigation';
import { AsyncError } from '../../../types';
import useTimer from '../../../utils/use-timer.hook';
import AuthLayout from '../auth-layout';

import OTPForm from './otp-form';


const OTPVerify: React.FC<MainScreenProps<'OTPVerify'>> = ({ route }) => {
  const { countryCode, phoneNumber } = route.params;
  const sendOTPDelayInMilliseconds = 60_000;
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { startTimer, remainingSecondsStr, isResendEnabled } = useTimer({
    delayInMilliseconds: sendOTPDelayInMilliseconds,
  });

  const onError = (error: AsyncError) => {
    Alert.alert('Error', error.message);
  };

  const onResendOTPSuccess = () => {
    startTimer();
  };

  const onVerifyOTPSuccess = () => {
    setSnackbarMessage('OTP verified successfully');
    setSnackbarVisible(true);
  };

  const theme = useTheme();
  const spacing = (theme as any).spacing;
  const snackbarStyle = {
    position: 'absolute',
    backgroundColor: '#000',
    borderRadius: (theme as any).roundness,
    alignSelf: 'center',
    bottom: spacing?.xl,
    maxWidth: '80%',
    paddingHorizontal: spacing?.md,
  } as const;

  const styles = StyleSheet.create({
    snackbarText: {
      color: '#fff',
    },
  });

  return (
    <AuthLayout primaryTitle="Better." secondaryTitle="">
      <OTPForm
        countryCode={countryCode}
        isResendEnabled={isResendEnabled}
        onError={onError}
        onResendOTPSuccess={onResendOTPSuccess}
        onVerifyOTPSuccess={onVerifyOTPSuccess}
        phoneNumber={phoneNumber}
        remainingSecondsStr={remainingSecondsStr}
      />
      <Portal>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={6000}
          style={snackbarStyle}
        >
          <Text style={styles.snackbarText}>{snackbarMessage}</Text>
        </Snackbar>
      </Portal>
    </AuthLayout>
  );
};

export default OTPVerify;

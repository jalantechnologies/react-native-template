import { Alert } from 'react-native';
import React from 'react';
import AuthLayout from '../auth-layout';
import OTPForm from './otp-form';
import useTimer from '../../../utils/use-timer.hook';
import { AsyncError } from '../../../types';

const OTP: React.FC = ({ route, navigation }) => {
  const { countryCode, phoneNumber } = route.params;
  const sendOTPDelayInMilliseconds = 60_000;

  const { startTimer, remaininingSecondsStr, isResendEnabled } = useTimer({
    delayInMilliseconds: sendOTPDelayInMilliseconds,
  });

  const onError = (error: AsyncError) => {
    Alert.alert('Error', error.message);
  };
  const onResendOTPSuccess = () => {
    startTimer();
  };
  const onVerifyOTPSuccess = async () => {
    navigation.navigate('Auth');
  };
  return (
    <AuthLayout>
      <OTPForm
        countryCode={countryCode}
        isResendEnabled={isResendEnabled}
        onError={onError}
        onResendOTPSuccess={onResendOTPSuccess}
        onVerifyOTPSuccess={onVerifyOTPSuccess}
        phoneNumber={phoneNumber}
        remaininingSecondsStr={remaininingSecondsStr}
      />
    </AuthLayout>
  );
};

export default OTP;

import { Alert } from 'react-native';
import React from 'react';
import AuthLayout from '../auth-layout';
import OTPForm from './otp-form';
import useTimer from '../../../utils/use-timer.hook';
import { AsyncError } from '../../../types';
import { useAccountContext } from '../../../contexts';

const OTP: React.FC = ({ route, navigation }) => {
  const { isNewUser } = useAccountContext();
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
    if (isNewUser) {
      navigation.navigate('UserPortal', { screen: 'Registration' });
    } else {
      navigation.navigate('UserPortal', { screen: 'Dashboard' });
    }
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

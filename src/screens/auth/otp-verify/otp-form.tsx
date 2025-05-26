import {
  Box,
  Center,
  Container,
  Heading,
  Link,
  Text,
  VStack,
  KeyboardAvoidingView,
} from 'native-base';
import React from 'react';
import { Platform } from 'react-native';

import { Button, FormControl, OTPInput } from '../../../components';
import { AuthOptions } from '../../../constants';
import { AsyncError } from '../../../types';

import useOTPForm from './otp-form-hook';

interface OTPFormProps {
  countryCode: string;
  isResendEnabled: boolean;
  onError: (err: AsyncError) => void;
  onResendOTPSuccess: () => void;
  onVerifyOTPSuccess: () => void;
  phoneNumber: string;
  remainingSecondsStr: string;
}

const OTPForm: React.FC<OTPFormProps> = ({
  countryCode,
  isResendEnabled,
  onError,
  onResendOTPSuccess,
  onVerifyOTPSuccess,
  phoneNumber,
  remainingSecondsStr,
}) => {
  const getMaskedPhoneNumber = () => {
    return phoneNumber.replace(/.(?=.{4})/g, 'X');
  };

  const { formik, handleResendOTP, isVerifyOTPLoading } = useOTPForm({
    onError,
    onResendOTPSuccess,
    onVerifyOTPSuccess,
    countryCode,
    phoneNumber,
  });

  const handleSetOtp = (otp: string[]) => {
    formik.setFieldValue('otp', otp);
  };

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={64}
    >
      <Box flex={1} px={4} pb={4}>
        <VStack space={10} flex={1}>
          <Container>
            <Heading size="lg">Enter OTP</Heading>
            <Heading mt="1" size="xs">
              We have the sent the OTP code to {countryCode} {getMaskedPhoneNumber()}
            </Heading>
          </Container>
          <Box mt={3}>
            <FormControl>
              <Center>
                <OTPInput
                  length={AuthOptions.OTPLength}
                  otp={formik.values.otp}
                  setOtp={handleSetOtp}
                />
              </Center>
            </FormControl>
          </Box>
          <Container>
            <Heading size="xs">Didn't receive the OTP? </Heading>
            <Link onPress={handleResendOTP} isUnderlined={false}>
              <Text color={isResendEnabled ? 'primary.500' : 'coolGray.600'}>
                {isResendEnabled ? 'Resend OTP' : `Resend OTP in 00:${remainingSecondsStr}`}
              </Text>
            </Link>
          </Container>
          <Box flex={1} />
        </VStack>

        <Button
          isLoading={isVerifyOTPLoading}
          onClick={() => formik.handleSubmit()}
          disabled={!(formik.isValid && formik.dirty)}
          width="100%"
        >
          Verify OTP
        </Button>
      </Box>
    </KeyboardAvoidingView>
  );
};

export default OTPForm;

import { Box, Center, Container, Heading, Link, Text, VStack } from 'native-base';
import React from 'react';

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
    <Box flex={1} pb={4}>
      <VStack space={6} flex={1} mb={8}>
        <Container>
          <Heading size="lg">Verify OTP</Heading>
        </Container>
        <Box mt={3}>
          <FormControl label="Enter your otp sent to your mobile number">
            <Center>
              <OTPInput
                length={AuthOptions.OTPLength}
                otp={formik.values.otp}
                setOtp={handleSetOtp}
              />
            </Center>
          </FormControl>

          <Text size="xs" lineHeight={18} mt={2}>
            Didn’t receive the OTP?{' '}
            <Link
              onPress={handleResendOTP}
              _text={{
                fontSize: 12,
                alignSelf: 'center',
                lineHeight: 16,
                color: isResendEnabled ? 'primary.500' : 'coolGray.600',
              }}
            >
              {isResendEnabled ? 'Resend OTP' : `Resend OTP in 00:${remainingSecondsStr}`}
            </Link>
          </Text>
        </Box>
      </VStack>

      <Button
        isLoading={isVerifyOTPLoading}
        onClick={() => formik.handleSubmit()}
        disabled={!(formik.isValid && formik.dirty)}
      >
        Verify OTP
      </Button>
    </Box>
  );
};

export default OTPForm;

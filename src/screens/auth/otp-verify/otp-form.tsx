import React from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Link,
  Text,
  VStack,
} from 'native-base';
import useOTPForm from './otp-form-hook';
import { OTPInput } from '../../../components';
import { AsyncError } from '../../../types';
import { AuthOptions } from '../../../constants';

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
    <VStack space={10}>
      <Box>
        <Container>
          <Heading size="lg">Enter OTP</Heading>
          <Heading mt="1" size="xs">
            We have the sent the OTP code to {countryCode} {getMaskedPhoneNumber()}
          </Heading>
        </Container>
        <FormControl py={5}>
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
          <Text color={isResendEnabled ? 'primary' : 'coolGray.600'}>
            {isResendEnabled ? 'Resend OTP' : `Resend OTP in 00:${remainingSecondsStr}`}
          </Text>
        </Link>
      </Container>
      <Button
        isLoadingText="Verifying OTP"
        isLoading={isVerifyOTPLoading}
        onPress={() => formik.handleSubmit()}
        isDisabled={!(formik.isValid && formik.dirty)}
      >
        Verify OTP
      </Button>
    </VStack>
  );
};

export default OTPForm;

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
import constant from '../../../constants/auth';

interface OTPFormProps {
  countryCode: string;
  isResendEnabled: boolean;
  onError: (err: AsyncError) => void;
  onResendOTPSuccess: () => void;
  onVerifyOTPSuccess: () => void;
  phoneNumber: string;
  remaininingSecondsStr: string;
}

const OTPForm: React.FC<OTPFormProps> = ({
  countryCode,
  isResendEnabled,
  onError,
  onResendOTPSuccess,
  onVerifyOTPSuccess,
  phoneNumber,
  remaininingSecondsStr,
}) => {
  const getMaskedPhoneNumber = () => {
    const maskedPhoneNumber = phoneNumber.replace(/.(?=.{4})/g, 'X');
    return maskedPhoneNumber;
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
          <Heading size="lg" fontWeight="600" color="coolGray.800">
            Enter OTP
          </Heading>
          <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
            We have the sent the OTP code to {countryCode}{' '}
            {getMaskedPhoneNumber()}
          </Heading>
        </Container>
        <FormControl py={5}>
          <Center>
            <OTPInput
              length={constant.OTP_LENGTH}
              otp={formik.values.otp}
              setOtp={handleSetOtp}
            />
          </Center>
        </FormControl>
      </Box>
      <Container>
        <Heading size="sm" color="coolGray.600" fontWeight="medium">
          Didn't receive the OTP?{' '}
        </Heading>
        <Link onPress={handleResendOTP} isUnderlined={false}>
          <Text color={isResendEnabled ? 'primary' : 'coolGray.600'}>
            {isResendEnabled
              ? 'Resend OTP'
              : `Resend OTP in 00:${remaininingSecondsStr}`}
          </Text>
        </Link>
      </Container>
      <Button
        isLoadingText="Verifying OTP"
        isLoading={isVerifyOTPLoading}
        onPress={() => formik.handleSubmit()}
        isDisabled={formik.isValid && formik.dirty ? false : true}
      >
        Verify OTP
      </Button>
    </VStack>
  );
};

export default OTPForm;

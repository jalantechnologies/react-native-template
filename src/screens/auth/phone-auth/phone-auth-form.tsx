import React from 'react';
import {
  VStack,
  Container,
  Heading,
  FormControl,
  HStack,
  Select,
  Input,
  Button,
} from 'native-base';
import useLoginForm from './phone-auth-form-hook';
import { AsyncError } from '../../../types';
import COUNTRY_SELECT_OPTIONS from '../../../constants/countries';

interface PhoneAuthFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const PhoneAuthForm: React.FC<PhoneAuthFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { formik, isSendOTPLoading } = useLoginForm({
    onSendOTPSuccess: onSuccess,
    onError: onError,
  });
  const handleSelectChange = (value: string) => {
    const [countryCode, country] = value.split(', ');
    formik.setFieldValue('countryCode', countryCode);
    formik.setFieldValue('country', country);
  };
  return (
    <VStack space={6}>
      <Container>
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Enter your number to continue
        </Heading>
      </Container>
      <FormControl
        isRequired={true}
        isInvalid={
          formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
        }
      >
        <FormControl.Label>Phone Number</FormControl.Label>
        <HStack space={2}>
          <Select
            selectedValue={`${formik.values.countryCode}, ${formik.values.country}`}
            onValueChange={handleSelectChange}
            dropdownIcon={<></>}
            minWidth={20}
            px={0}
          >
            {COUNTRY_SELECT_OPTIONS.map(option => (
              <Select.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Select>
          <Input
            value={formik.values.phoneNumber}
            onChangeText={formik.handleChange('phoneNumber')}
            keyboardType="numeric"
            flex={1}
            placeholder="XXXXXXXXXX"
          />
        </HStack>
        <FormControl.ErrorMessage>
          {formik.errors.phoneNumber}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button
        mt="2"
        bg={'primary'}
        onPress={() => formik.handleSubmit()}
        isLoading={isSendOTPLoading}
      >
        Send OTP
      </Button>
    </VStack>
  );
};

export default PhoneAuthForm;

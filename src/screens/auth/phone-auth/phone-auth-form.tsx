import React from 'react';
import {
  VStack,
  Container,
  Heading,
  FormControl,
  HStack,
  Input,
  Button,
  useDisclose,
  Text,
  Pressable,
  Menu,
  ScrollView,
} from 'native-base';
import usePhoneAuthForm from './phone-auth-form-hook';
import { AsyncError } from '../../../types';
import { CountrySelectOptions } from '../../../constants';

interface PhoneAuthFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const renderCountrySelectMenu = (
  formik: ReturnType<typeof usePhoneAuthForm>['formik'],
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  handleSelectChange: (value: string) => void,
) => {
  return (
    <Menu
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      trigger={triggerProps => (
        <Pressable
          {...triggerProps}
          borderWidth={1}
          justifyContent="center"
          borderColor={'warmGray.300'}
          rounded="sm"
          px={2}
        >
          <Text>{`${formik.values.country} (${formik.values.countryCode})`}</Text>
        </Pressable>
      )}
    >
      <ScrollView maxH={'200px'}>
        {CountrySelectOptions.map(option => (
          <Menu.Item
            key={option.value}
            onPress={() => {
              handleSelectChange(option.value);
              onClose();
            }}
          >
            {option.label}
          </Menu.Item>
        ))}
      </ScrollView>
    </Menu>
  );
};

const PhoneAuthForm: React.FC<PhoneAuthFormProps> = ({ onSuccess, onError }) => {
  const { formik, isSendOTPLoading } = usePhoneAuthForm({
    onSendOTPSuccess: onSuccess,
    onError: onError,
  });

  const { isOpen, onOpen, onClose } = useDisclose();

  const handleSelectChange = (value: string) => {
    const [countryCode, country] = value.split(', ');
    formik.setFieldValue('countryCode', countryCode);
    formik.setFieldValue('country', country);
  };

  return (
    <VStack space={6}>
      <Container>
        <Heading size="lg">Welcome</Heading>
        <Heading mt="1" size="xs">
          Enter your number to continue
        </Heading>
      </Container>
      <FormControl
        isRequired={true}
        isInvalid={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
      >
        <FormControl.Label>Phone Number</FormControl.Label>
        <HStack space={2}>
          {renderCountrySelectMenu(formik, isOpen, onOpen, onClose, handleSelectChange)}
          <Input
            value={formik.values.phoneNumber}
            onChangeText={formik.handleChange('phoneNumber')}
            keyboardType="numeric"
            flex={3}
            placeholder="XXXXXXXXXX"
          />
        </HStack>
        <FormControl.ErrorMessage>{formik.errors.phoneNumber}</FormControl.ErrorMessage>
      </FormControl>
      <Button mt="2" onPress={() => formik.handleSubmit()} isLoading={isSendOTPLoading}>
        Send OTP
      </Button>
    </VStack>
  );
};

export default PhoneAuthForm;

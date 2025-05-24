import { Button, FormControl, Input } from 'boilerplate-react-native/src/components';
import {
  VStack,
  Container,
  Heading,
  HStack,
  useDisclose,
  Text,
  Pressable,
  Menu,
  ScrollView,
  Link,
  Center,
  Box,
} from 'native-base';
import React from 'react';

import { CountrySelectOptions } from '../../../constants';
import { AsyncError } from '../../../types';

import usePhoneAuthForm from './phone-auth-form-hook';

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
    <>
      <VStack space={6} flex={1}>
        <Container>
          <Heading size="lg">Welcome</Heading>
          <Heading mt="1" size="xs">
            Enter your number to continue
          </Heading>
        </Container>
        <FormControl label={'Phone Number'}>
          <HStack space={2} width="100%">
            {renderCountrySelectMenu(formik, isOpen, onOpen, onClose, handleSelectChange)}
            <Box flex={3} justifyContent="center">
              <Input
                value={formik.values.phoneNumber}
                onChangeText={formik.handleChange('phoneNumber')}
                keyboardType="numeric"
                placeholder="XXXXXXXXXX"
                error={formik.errors.phoneNumber}
              />
            </Box>
          </HStack>
        </FormControl>
        <Button onClick={() => formik.handleSubmit()} isLoading={isSendOTPLoading}>
          Send OTP
        </Button>
      </VStack>
      <Center>
        <Text>By continuing, you agree to our </Text>
        <Link
          _text={{ color: 'primary' }}
          href="https://jalantechnologies.github.io/boilerplate-react-native/"
        >
          Privacy Policy
        </Link>
      </Center>
    </>
  );
};

export default PhoneAuthForm;

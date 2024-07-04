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

  const { isOpen, onOpen, onClose } = useDisclose();

  const handleSelectChange = (value: string) => {
    const [countryCode, country] = value.split(', ');
    formik.setFieldValue('countryCode', countryCode);
    formik.setFieldValue('country', country);
  };

  const renderCountrySelectMenu = () => {
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
          {COUNTRY_SELECT_OPTIONS.map(option => (
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
          {renderCountrySelectMenu()}
          <Input
            value={formik.values.phoneNumber}
            onChangeText={formik.handleChange('phoneNumber')}
            keyboardType="numeric"
            flex={3}
            placeholder="XXXXXXXXXX"
          />
        </HStack>
        <FormControl.ErrorMessage>
          {formik.errors.phoneNumber}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button
        mt="2"
        onPress={() => formik.handleSubmit()}
        isLoading={isSendOTPLoading}
      >
        Send OTP
      </Button>
    </VStack>
  );
};

export default PhoneAuthForm;

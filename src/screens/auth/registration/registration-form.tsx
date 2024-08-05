import { Button, Container, FormControl, Heading, Input, VStack } from 'native-base';
import React from 'react';

import { AsyncError } from '../../../types';

import useRegistrationForm from './registration-form-hook';

interface RegistrationFormProps {
  onError: (error: AsyncError) => void;
  onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, onError }) => {
  const { formik, isUpdateAccountLoading } = useRegistrationForm({
    onRegistrationError: onError,
    onRegistrationSuccess: onSuccess,
  });

  return (
    <VStack space={4}>
      <Container>
        <Heading size="lg">New User Registration</Heading>
        <Heading mt={2} size="xs">
          Please fill the form to create an account
        </Heading>
      </Container>
      <FormControl
        isRequired={true}
        isInvalid={formik.touched.firstName && Boolean(formik.errors.firstName)}
      >
        <FormControl.Label>First Name</FormControl.Label>
        <Input
          onChangeText={formik.handleChange('firstName')}
          value={formik.values.firstName}
          placeholder="First Name"
        />
        <FormControl.ErrorMessage>{formik.errors.firstName}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired={false}>
        <FormControl.Label>Last Name</FormControl.Label>
        <Input
          onChangeText={formik.handleChange('lastName')}
          value={formik.values.lastName}
          placeholder="Last Name"
        />
      </FormControl>
      <Button onPress={() => formik.handleSubmit()} isLoading={isUpdateAccountLoading}>
        Create Account
      </Button>
    </VStack>
  );
};

export default RegistrationForm;

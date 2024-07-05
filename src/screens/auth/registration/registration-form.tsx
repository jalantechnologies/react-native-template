import React from 'react';
import { AsyncError } from '../../../types';
import useRegistrationForm from './registration-form-hook';
import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from 'native-base';

interface RegistrationFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { formik, isUpdateAccountLoading } = useRegistrationForm({
    onRegistrationError: onError,
    onRegistrationSuccess: onSuccess,
  });

  return (
    <VStack space={4}>
      <Container>
        <Heading size="sm" fontWeight="600" color="coolGray.800">
          New User Registration
        </Heading>
        <Heading mt={2} size="xs" color="coolGray.600">
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
        <FormControl.ErrorMessage>
          {formik.errors.firstName}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired={false}>
        <FormControl.Label>Last Name</FormControl.Label>
        <Input
          onChangeText={formik.handleChange('lastName')}
          value={formik.values.lastName}
          placeholder="Last Name"
        />
      </FormControl>
      <Button
        onPress={() => formik.handleSubmit()}
        isLoading={isUpdateAccountLoading}
      >
        Create Account
      </Button>
    </VStack>
  );
};

export default RegistrationForm;

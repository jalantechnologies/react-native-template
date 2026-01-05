import React from 'react';
import { View } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';

import { AsyncError } from '../../../types';

import useRegistrationForm from './registration-form-hook';
import { useRegistrationStyles } from './registration.styles';

interface RegistrationFormProps {
  onError: (error: AsyncError) => void;
  onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, onError }) => {
  const { formik, isUpdateAccountLoading } = useRegistrationForm({
    onRegistrationError: onError,
    onRegistrationSuccess: onSuccess,
  });

  const styles = useRegistrationStyles();

  return (
    <View >
      <View style={styles.header}>
        <Text variant="titleLarge">New User Registration</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Please fill the form to create an {'\n'} account
        </Text>
      </View>

      <View>
        <Text style={styles.text}>First Name</Text>
        <TextInput
          placeholder="First Name"
          mode="outlined"
          value={formik.values.firstName}
          onChangeText={formik.handleChange('firstName')}
          error={!!formik.errors.firstName}
          style={styles.textBox}
        />
        <HelperText type="error" visible={!!formik.errors.firstName}>
          {formik.errors.firstName}
        </HelperText>
      </View>

      <View>
        <Text style={styles.text}>Last Name</Text>
        <TextInput
          placeholder="Last Name"
          mode="outlined"
          value={formik.values.lastName}
          onChangeText={formik.handleChange('lastName')}
          error={!!formik.errors.lastName}
          style={styles.textBox}
        />
        <HelperText type="error" visible={!!formik.errors.lastName}>
          {formik.errors.lastName}
        </HelperText>
      </View>

      <Button
        mode="contained"
        loading={isUpdateAccountLoading}
        onPress={() => formik.handleSubmit()}
      >
        Create Account
      </Button>
    </View>
  );
};

export default RegistrationForm;

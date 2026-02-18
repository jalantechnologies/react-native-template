import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton, AppTextInput } from '../../../components';
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 32, fontWeight: 'bold' }}>New User Registration</Text>
        <Text style={[styles.subHeading, { fontSize: 14 }]}>
          Please fill the form to create an account
        </Text>
      </View>

      <AppTextInput
        label="First Name"
        onChangeText={formik.handleChange('firstName')}
        value={formik.values.firstName}
        errorText={formik.errors.firstName}
      />

      <AppTextInput
        label="Last Name"
        onChangeText={formik.handleChange('lastName')}
        value={formik.values.lastName}
        errorText={formik.errors.lastName}
      />

      <AppButton
        onPress={() => formik.handleSubmit()}
        loading={isUpdateAccountLoading}
        style={styles.button}
      >
        Create Account
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  header: {
    marginBottom: 8,
  },
  subHeading: {
    marginTop: 8,
    opacity: 0.7,
  },
  button: {
    marginTop: 16,
  },
});

export default RegistrationForm;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button as PaperButton, HelperText, Text, TextInput, useTheme } from 'react-native-paper';

import { AsyncError } from '../../../types';

import useRegistrationForm from './registration-form-hook';

interface RegistrationFormProps {
  onError: (error: AsyncError) => void;
  onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, onError }) => {
  const theme = useTheme();
  const spacing = (theme as any).spacing;
  const { formik, isUpdateAccountLoading } = useRegistrationForm({
    onRegistrationError: onError,
    onRegistrationSuccess: onSuccess,
  });

  const styles = StyleSheet.create({
    container: { gap: spacing.md },
    header: { marginBottom: spacing.sm },
    inputContainer: { marginTop: spacing.sm },
    button: { borderRadius: (theme as any).roundness },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall">New User Registration</Text>
        <Text variant="bodyMedium">Please fill the form to create an account</Text>
      </View>

      <View>
        <Text variant="labelLarge">First Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            value={formik.values.firstName}
            onChangeText={formik.handleChange('firstName')}
            placeholder="First Name"
            error={Boolean(formik.errors.firstName)}
          />
        </View>
        <HelperText type="error" visible={Boolean(formik.errors.firstName)}>
          {formik.errors.firstName}
        </HelperText>
      </View>

      <View>
        <Text variant="labelLarge">Last Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            value={formik.values.lastName}
            onChangeText={formik.handleChange('lastName')}
            placeholder="Last Name"
            error={Boolean(formik.errors.lastName)}
          />
        </View>
        <HelperText type="error" visible={Boolean(formik.errors.lastName)}>
          {formik.errors.lastName}
        </HelperText>
      </View>

      <PaperButton
        mode="contained"
        onPress={() => formik.handleSubmit()}
        loading={isUpdateAccountLoading}
        style={styles.button}
      >
        Create Account
      </PaperButton>
    </View>
  );
};

export default RegistrationForm;

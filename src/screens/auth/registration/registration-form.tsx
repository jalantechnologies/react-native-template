import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { AsyncError } from '../../../types';

import useRegistrationForm from './registration-form-hook';

interface RegistrationFormProps {
  onError: (error: AsyncError) => void;
  onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess, onError }) => {
  const { colors } = useTheme();
  const { formik, isUpdateAccountLoading } = useRegistrationForm({
    onRegistrationError: onError,
    onRegistrationSuccess: onSuccess,
  });

  return (
    <View style={styles.container}>
      <View style={styles.copyWrapper}>
        <Text style={[styles.title, { color: colors.onSurface }]} variant="titleLarge">
          Personal Details
        </Text>
        <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]} variant="bodyMedium">
          Complete your profile by providing your personal details.
        </Text>
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label="First Name"
          mode="outlined"
          error={Boolean(formik.touched.firstName && formik.errors.firstName)}
          onBlur={formik.handleBlur('firstName')}
          onChangeText={formik.handleChange('firstName')}
          placeholder="Enter your first name"
          value={formik.values.firstName}
        />
        <HelperText
          type="error"
          visible={Boolean(formik.touched.firstName && formik.errors.firstName)}
        >
          {formik.errors.firstName ?? ''}
        </HelperText>
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          label="Last Name"
          mode="outlined"
          error={Boolean(formik.touched.lastName && formik.errors.lastName)}
          onBlur={formik.handleBlur('lastName')}
          onChangeText={formik.handleChange('lastName')}
          placeholder="Enter your last name"
          value={formik.values.lastName}
        />
        <HelperText
          type="error"
          visible={Boolean(formik.touched.lastName && formik.errors.lastName)}
        >
          {formik.errors.lastName ?? ''}
        </HelperText>
      </View>

      <Button
        buttonColor={colors.primary}
        mode="contained"
        onPress={() => formik.handleSubmit()}
        loading={isUpdateAccountLoading}
        disabled={!formik.isValid}
        style={styles.submitButton}
        contentStyle={styles.submitButtonContent}
        uppercase={false}
      >
        Next
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  copyWrapper: {
    alignItems: 'flex-start',
    marginBottom: 24,
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
    width: '100%',
  },
  submitButton: {
    borderRadius: 24,
    marginTop: 'auto',
  },
  submitButtonContent: {
    height: 52,
  },
  subtitle: {
    lineHeight: 20,
  },
  title: {
    marginBottom: 8,
    fontWeight: '600',
    textAlign: 'left',
  },
});

export default RegistrationForm;

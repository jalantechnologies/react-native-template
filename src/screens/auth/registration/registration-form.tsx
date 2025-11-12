import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import {
  MD3Theme,
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

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { formik, isUpdateAccountLoading } = useRegistrationForm({
    onRegistrationError: onError,
    onRegistrationSuccess: onSuccess,
  });

  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.heading}>
          <Text variant="headlineSmall">New User Registration</Text>
          <Text variant="bodyMedium">
            Please fill the form to create an account
          </Text>
        </View>

        {/* First Name Field */}
        <View style={styles.fieldContainer}>
          <Text variant="labelLarge" style={styles.label}>
            First Name
          </Text>
          <TextInput
            autoCapitalize="words"
            mode="outlined"
            dense
            contentStyle={styles.inputContent}
            style={styles.input}
            onBlur={formik.handleBlur('firstName')}
            onChangeText={formik.handleChange('firstName')}
            placeholder="First Name"
            value={formik.values.firstName}
          />
          <HelperText
            type="error"
            visible={Boolean(formik.touched.firstName && formik.errors.firstName)}
          >
            {formik.errors.firstName}
          </HelperText>
        </View>

        {/* Last Name Field */}
        <View style={styles.fieldContainer}>
          <Text variant="labelLarge" style={styles.label}>
            Last Name
          </Text>
          <TextInput
            autoCapitalize="words"
            mode="outlined"
            dense
            contentStyle={styles.inputContent}
            style={styles.input}
            onBlur={formik.handleBlur('lastName')}
            onChangeText={formik.handleChange('lastName')}
            placeholder="Last Name"
            value={formik.values.lastName}
          />
          <HelperText
            type="error"
            visible={Boolean(formik.touched.lastName && formik.errors.lastName)}
          >
            {formik.errors.lastName}
          </HelperText>
        </View>
      </View>

      <Button
        disabled={!(formik.isValid && formik.dirty)}
        loading={isUpdateAccountLoading}
        mode="contained"
        onPress={() => formik.handleSubmit()}
      >
        Create Account
      </Button>
    </View>
  );
};

export default RegistrationForm;

const useStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    content: {
      gap: theme.roundness,
    },
    heading: {
      gap: theme.roundness,
    },
    fieldContainer: {
      marginBottom: 20, 
    },
    label: {
      marginBottom: 6, 
      textAlignVertical: 'bottom',
      ...(Platform.OS === 'android' && { lineHeight: 18 }), 
      color: theme.colors.primary,
    },
    input: {
      ...(Platform.OS === 'android' && { paddingTop: 2 }),
    },
    inputContent: {
      paddingVertical: 0,
    },
  });

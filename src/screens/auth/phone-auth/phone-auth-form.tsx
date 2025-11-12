import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput, useTheme } from 'react-native-paper';

import { AsyncError } from '../../../types';

import usePhoneAuthForm from './phone-auth-form-hook';

interface PhoneAuthFormProps {
  onError: (error: AsyncError) => void;
  onSuccess: () => void;
}

const PhoneAuthForm: React.FC<PhoneAuthFormProps> = ({ onError, onSuccess }) => {
  const { colors } = useTheme();
  const { formik, isSendOTPLoading } = usePhoneAuthForm({
    onError,
    onSendOTPSuccess: onSuccess,
  });

  const handlePhoneNumberChange = (value: string) => {
    const sanitized = value.replace(/\D/g, '').slice(0, 10);
    formik.setFieldValue('phoneNumber', sanitized);
  };

  return (
    <View style={styles.container}>
      <View style={styles.copyWrapper}>
        <Text style={[styles.title, { color: colors.onSurface }]} variant="headlineSmall">
          Enter Mobile Number
        </Text>
        <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]} variant="bodyMedium">
          We will send a one-time password to this mobile number
        </Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          mode="outlined"
          label="Mobile Number"
          value={formik.values.phoneNumber}
          onChangeText={handlePhoneNumberChange}
          onBlur={formik.handleBlur('phoneNumber')}
          keyboardType="phone-pad"
          placeholder="Enter mobile number"
          style={styles.textInput}
          contentStyle={styles.textInputContent}
          outlineStyle={[styles.textInputOutline, { borderColor: colors.outline }]}
          maxLength={10}
          returnKeyType="done"
          textContentType="telephoneNumber"
          selectionColor={colors.primary}
        />
        <HelperText
          type="error"
          visible={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
        >
          {formik.errors.phoneNumber ?? ''}
        </HelperText>
      </View>

      <Button
        mode="contained"
        contentStyle={styles.submitButtonContent}
        disabled={!formik.isValid || !formik.dirty}
        loading={isSendOTPLoading}
        onPress={() => formik.handleSubmit()}
        style={styles.submitButton}
        uppercase={false}
      >
        Get OTP
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 24,
  },
  copyWrapper: {
    alignItems: 'flex-start',
    marginBottom: 24,
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 32,
    width: '100%',
  },
  submitButton: {
    borderRadius: 24,
    marginTop: 'auto',
    width: '100%',
  },
  submitButtonContent: {
    height: 56,
  },
  subtitle: {
    lineHeight: 20,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  textInputContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textInputOutline: {
    borderRadius: 12,
    borderWidth: 1,
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
  },
});

export default PhoneAuthForm;

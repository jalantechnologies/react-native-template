import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import {
  Menu,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import { AppButton, AppCheckbox, AppTextInput } from '../../../components';
import { CountrySelectOptions } from '../../../constants';
import { AsyncError, PhoneNumber } from '../../../types';
import { useThemeColor } from '../../../utils';
import usePhoneAuthForm from './phone-auth-form-hook';

interface PhoneAuthFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const PhoneAuthForm: React.FC<PhoneAuthFormProps> = ({ onSuccess, onError }) => {
  const primaryColor = useThemeColor('primary.500');
  const { formik, isSendOTPLoading } = usePhoneAuthForm({
    onSendOTPSuccess: onSuccess,
    onError: onError,
  });

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectChange = (value: string) => {
    const [countryCode, country] = value.split(', ');
    formik.setFieldValue('countryCode', countryCode);
    formik.setFieldValue('country', country);
    setIsMenuVisible(false);
  };

  const phoneNumber = new PhoneNumber({
    country_code: formik.values.countryCode.replace('+', ''),
    phone_number: formik.values.phoneNumber,
  });

  const phoneNumberPlaceholder = new PhoneNumber({
    country_code: formik.values.countryCode.replace('+', ''),
    phone_number: '9999999999',
  }).getFormattedWithoutCountryCode();

  return (
    <View style={appStyles.container}>
      <ScrollView contentContainerStyle={appStyles.scrollContent}>
        <Text variant="headlineLarge" style={appStyles.heading}>Login</Text>

        <View style={appStyles.phoneInputContainer}>
          <Text variant="labelLarge" style={appStyles.label}>Mobile Number</Text>
          <View style={appStyles.inputRow}>
            <Menu
              visible={isMenuVisible}
              onDismiss={() => setIsMenuVisible(false)}
              anchor={
                <TouchableRipple
                  onPress={() => setIsMenuVisible(true)}
                  style={appStyles.countrySelector}
                >
                  <Text>{`${formik.values.country} (${formik.values.countryCode})`}</Text>
                </TouchableRipple>
              }
            >
              <ScrollView style={{ maxHeight: 200 }}>
                {CountrySelectOptions.map(option => (
                  <Menu.Item
                    key={option.value}
                    onPress={() => handleSelectChange(option.value)}
                    title={option.label}
                  />
                ))}
              </ScrollView>
            </Menu>

            <View style={appStyles.phoneNumberInput}>
              <AppTextInput
                value={phoneNumber.getFormattedWithoutCountryCode()}
                onChangeText={formik.handleChange('phoneNumber')}
                keyboardType="numeric"
                placeholder={phoneNumberPlaceholder}
                errorText={formik.touched.phoneNumber ? formik.errors.phoneNumber : undefined}
                style={{ flex: 1 }}
                containerStyle={{ marginBottom: 0 }}
              />
            </View>
          </View>
        </View>

        <View style={appStyles.checkboxRow}>
          <AppCheckbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(!isChecked)}
            color={primaryColor}
          />
          <View style={appStyles.agreementText}>
            <Text variant="bodySmall">By continuing, you agree to our </Text>
            <Text
              style={[appStyles.link, { color: primaryColor }]}
              onPress={() => Linking.openURL('https://jalantechnologies.github.io/react-native-template/')}
            >
              Privacy Policy
            </Text>
          </View>
        </View>
      </ScrollView>

      <AppButton
        disabled={!isChecked}
        loading={isSendOTPLoading}
        onPress={() => formik.handleSubmit()}
        style={appStyles.submitButton}
      >
        Send OTP
      </AppButton>
    </View>
  );
};

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  heading: {
    marginBottom: 24,
  },
  phoneInputContainer: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  countrySelector: {
    height: 56,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    paddingHorizontal: 12,
    minWidth: 100,
  },
  phoneNumberInput: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  agreementText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  link: {
    textDecorationLine: 'underline',
  },
  submitButton: {
    marginTop: 'auto',
  },
});

export default PhoneAuthForm;

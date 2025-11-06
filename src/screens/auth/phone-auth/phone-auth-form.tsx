import React, { useState } from 'react';
import { Linking, ScrollView as RNScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, Menu, Text, TextInput, useTheme } from 'react-native-paper';

import { CountrySelectOptions } from '../../../constants';
import { AsyncError, PhoneNumber } from '../../../types';

import usePhoneAuthForm from './phone-auth-form-hook';
import { usePhoneAuthFormStyles } from './phone-auth-form.styles';

interface PhoneAuthFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const renderCountrySelectMenu = (
  formik: ReturnType<typeof usePhoneAuthForm>['formik'],
  visible: boolean,
  open: () => void,
  close: () => void,
  handleSelectChange: (value: string) => void,
  anchorStyle: object,
  maxMenuHeight: number,
  menuScrollStyle: object,
  buttonContentStyle: object,
) => (
  <Menu
    visible={visible}
    onDismiss={close}
    anchor={
      <Button
        mode="outlined"
        onPress={open}
        style={anchorStyle}
        contentStyle={buttonContentStyle}
      >
        {`${formik.values.country} (${formik.values.countryCode})`}
      </Button>
    }
  >
    <RNScrollView style={menuScrollStyle}>
      {CountrySelectOptions.map(option => (
        <Menu.Item
          key={option.value}
          onPress={() => {
            handleSelectChange(option.value);
            close();
          }}
          title={option.label}
        />
      ))}
    </RNScrollView>
  </Menu>
);

const PhoneAuthForm: React.FC<PhoneAuthFormProps> = ({ onSuccess, onError }) => {
  const theme = useTheme();
  const styles = usePhoneAuthFormStyles();

  const { formik, isSendOTPLoading } = usePhoneAuthForm({
    onSendOTPSuccess: onSuccess,
    onError: onError,
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectChange = (value: string) => {
    const [countryCode, country] = value.split(', ');
    formik.setFieldValue('countryCode', countryCode);
    formik.setFieldValue('country', country);
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
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Text variant="headlineLarge">Login</Text>
        </View>

        <View>
          <Text variant="labelLarge">Mobile Number</Text>
          <View style={styles.row}>
            {renderCountrySelectMenu(
              formik,
              menuVisible,
              () => setMenuVisible(true),
              () => setMenuVisible(false),
              handleSelectChange,
              styles.countryAnchorButton,
              0,
              styles.menuScroll,
              styles.buttonContent,
            )}

            <View style={styles.phoneInputWrapper}>
              <TextInput
                mode="outlined"
                value={phoneNumber.getFormattedWithoutCountryCode()}
                onChangeText={formik.handleChange('phoneNumber')}
                keyboardType="numeric"
                placeholder={phoneNumberPlaceholder}
                error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
              />
            </View>
          </View>
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <Text variant="bodySmall" style={styles.errorText}>
              {formik.errors.phoneNumber}
            </Text>
          ) : null}
        </View>

        <View style={styles.agreementRow} accessibilityLabel="Agree to privacy policy">
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(prev => !prev)}
            color={theme.colors.primary}
            uncheckedColor={theme.colors.onSurfaceVariant}
          />
          <TouchableOpacity onPress={() => setIsChecked(prev => !prev)}>
            <Text variant="bodySmall">
              By continuing, you agree to our
              <Text
                variant="bodySmall"
                style={styles.privacyLink}
                onPress={() => Linking.openURL('https://jalantechnologies.github.io/react-native-template/')}
              >
                {' '}Privacy Policy
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button
        disabled={!isChecked}
        loading={isSendOTPLoading}
        mode="contained"
        onPress={() => formik.handleSubmit()}
      >
        Send OTP
      </Button>
    </View>
  );
};

export default PhoneAuthForm;

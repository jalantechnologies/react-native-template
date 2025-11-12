import React, { useMemo, useState } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { Linking, Pressable, ScrollView as RNScrollView, View } from 'react-native';
import {
  Button,
  Checkbox,
  HelperText,
  Menu,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { CountrySelectOptions } from '../../../constants';
import { AsyncError, PhoneNumber } from '../../../types';

import usePhoneAuthForm from './phone-auth-form-hook';
import { usePhoneAuthFormStyles } from './phone-auth-form.styles';

interface PhoneAuthFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

type Styles = ReturnType<typeof usePhoneAuthFormStyles>;

const renderCountrySelectMenu = (
  formik: ReturnType<typeof usePhoneAuthForm>['formik'],
  visible: boolean,
  open: () => void,
  close: () => void,
  handleSelectChange: (value: string) => void,
  styles: Styles,
) => (
  <Menu
    visible={visible}
    onDismiss={close}
    anchor={
      <Button
        mode="outlined"
        onPress={open}
        style={styles.countryAnchorButton}
        contentStyle={styles.buttonContent}
      >
        {`${formik.values.country} (${formik.values.countryCode})`}
      </Button>
    }
  >
    <RNScrollView style={styles.menuScroll}>
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
    onError,
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleSelectChange = (value: string) => {
    const [countryCode, country] = value.split(', ');
    formik.setFieldValue('countryCode', countryCode);
    formik.setFieldValue('country', country);
  };

  const phoneNumber = useMemo(
    () =>
      new PhoneNumber({
        country_code: formik.values.countryCode,
        phone_number: formik.values.phoneNumber,
      }),
    [formik.values.countryCode, formik.values.phoneNumber],
  );

  const phoneNumberPlaceholder = useMemo(
    () =>
      new PhoneNumber({
        country_code: formik.values.countryCode,
        phone_number: '9999999999',
      }).getFormattedWithoutCountryCode(),
    [formik.values.countryCode],
  );

  const phoneErrorVisible = Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber);

  const handlePrivacyPolicyPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    Linking.openURL('https://jalantechnologies.github.io/react-native-template/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineLarge">Login</Text>

        <View>
          <Text style={styles.inputLabel} variant="labelLarge">
            Mobile Number
          </Text>
          <View style={styles.phoneFieldsRow}>
            {renderCountrySelectMenu(
              formik,
              menuVisible,
              () => setMenuVisible(true),
              () => setMenuVisible(false),
              handleSelectChange,
              styles,
            )}

            <View style={styles.phoneInputWrapper}>
              <TextInput
                mode="outlined"
                value={phoneNumber.getFormattedWithoutCountryCode()}
                onChangeText={formik.handleChange('phoneNumber')}
                keyboardType="numeric"
                placeholder={phoneNumberPlaceholder}
                error={phoneErrorVisible}
                dense
                contentStyle={styles.inputContent}
              />
            </View>
          </View>
          <HelperText type="error" visible={phoneErrorVisible}>
            {formik.errors.phoneNumber ?? ''}
          </HelperText>
        </View>

        <View style={styles.agreementRow} accessibilityLabel="Agree to privacy policy">
          <Checkbox
            status={isChecked ? 'checked' : 'unchecked'}
            onPress={() => setIsChecked(prev => !prev)}
            color={theme.colors.primary}
            uncheckedColor={theme.colors.outline}
          />
          <Pressable onPress={() => setIsChecked(prev => !prev)}>
            <Text variant="bodySmall">
              By continuing, you agree to our
              <Text
                variant="bodySmall"
                style={styles.privacyLink}
                onPress={handlePrivacyPolicyPress}
              >
                {' '}Privacy Policy
              </Text>
            </Text>
          </Pressable>
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

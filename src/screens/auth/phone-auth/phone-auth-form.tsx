import { Checkbox } from 'native-base';
import React, { useState } from 'react';
import { Linking, View, Pressable, ScrollView } from 'react-native';
import { Button, useTheme, TextInput, HelperText, Menu, Text } from 'react-native-paper';
import CheckIcon from 'react-native-template/assets/icons/check.svg';

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
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  handleSelectChange: (value: string) => void,
  styles: ReturnType<typeof usePhoneAuthFormStyles>,
) => {

  return (
    <Menu
      visible={isOpen}
      onDismiss={onClose}
      contentStyle={{ width: 110 }}
      anchor={
        <Pressable
          onPress={onOpen}
          style={styles.menu}
        >
          <Text>{`${formik.values.country} (${formik.values.countryCode})`}</Text>
        </Pressable>
      }
    >
      <ScrollView >
        {CountrySelectOptions.map(option => (
          <Menu.Item
            key={option.value}
            title={option.label}
            titleStyle={{ fontSize: 18 }}
            onPress={() => {
              handleSelectChange(option.value);
              onClose();
            }}
          />
        ))}
      </ScrollView>
    </Menu>
  );
};

const PhoneAuthForm: React.FC<PhoneAuthFormProps> = ({ onSuccess, onError }) => {
  const theme = useTheme();
  const styles = usePhoneAuthFormStyles();
  const { formik, isSendOTPLoading } = usePhoneAuthForm({
    onSendOTPSuccess: onSuccess,
    onError: onError,
  });

  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);


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
    <View style={styles.phoneAuthScreen}>
      <View style={styles.Login}>
        <View style={styles.titleSpacing}>
          <Text variant="headlineMedium">Login</Text>
        </View>
        <View>
          <Text style={styles.text}>Mobile Number</Text>
          <View style={styles.row}>
            {renderCountrySelectMenu(formik, isOpen, onOpen, onClose, handleSelectChange, styles)}
            <View
              style={styles.inputBox}
            >
              <TextInput
                value={phoneNumber.getFormattedWithoutCountryCode()}
                onChangeText={formik.handleChange('phoneNumber')}
                keyboardType="numeric"
                placeholder={phoneNumberPlaceholder}
                activeOutlineColor={theme.colors.primaryContainer}
                mode="outlined"
                style={{ backgroundColor: theme.colors.surface }}
                error={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
              />
            </View>
          </View>
          <HelperText
            type="error"
            visible={!!(formik.touched.phoneNumber && formik.errors.phoneNumber)}
          >
            {formik.errors.phoneNumber}
          </HelperText>

        </View>

        <View style={styles.Checkbox}>
          <Checkbox
            isChecked={isChecked}
            onChange={setIsChecked}
            accessibilityLabel="Agree to privacy policy"
            value="agreePrivacyPolicy"
            icon={<CheckIcon width={12} height={12} color={theme.colors.primary} />}
            aria-label="Privacy Policy Checkbox"
            mt={0.5}
          />

          <View style={styles.checkBoxGap}>
            <Text >By continuing, you agree to our </Text>
            <Text
              style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}
              onPress={() =>
                Linking.openURL(
                  'https://jalantechnologies.github.io/react-native-template/'
                )
              }
            >
              Privacy Policy
            </Text>
          </View>
        </View>
      </View>


      <Button
        mode="contained"
        disabled={!isChecked}
        loading={isSendOTPLoading}
        onPress={() => formik.handleSubmit()}
      >
        Send OTP
      </Button>
    </View>
  );
};

export default PhoneAuthForm;

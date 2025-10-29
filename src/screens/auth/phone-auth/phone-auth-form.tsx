import { useDisclose, useTheme, Checkbox } from 'native-base';
import React, { useState } from 'react';
import { View, ScrollView as RNScrollView, Pressable, Linking } from 'react-native';
import {
  Button as PaperButton,
  Menu as PaperMenu,
  Text,
  TextInput,
} from 'react-native-paper';
import CheckIcon from 'react-native-template/assets/icons/check.svg';

import { FormControl } from 'react-native-template/src/components';
import { useThemeColor } from 'react-native-template/src/utils';

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
  outlineColor: string,
  activeOutlineColor: string,
  minHeight: number,
  fontSize: number,
) => (
  <PaperMenu
    visible={isOpen}
    onDismiss={onClose}
    anchor={
      <Pressable onPress={onOpen} style={{ flex: 1, width: '100%' }}>
        <TextInput
          mode="outlined"
          value={`${formik.values.country} (${formik.values.countryCode})`}
          editable={false}
          outlineColor={outlineColor}
          activeOutlineColor={activeOutlineColor}
          style={{ minHeight, fontSize, flex: 1 }}
          contentStyle={{ minHeight }}
          numberOfLines={1}
        />
      </Pressable>
    }
  >
    <RNScrollView style={{ maxHeight: 200 }}>
      {CountrySelectOptions.map(option => (
        <Pressable
          key={option.value}
          onPress={() => {
            handleSelectChange(option.value);
            onClose();
          }}
          style={{ paddingHorizontal: 12, paddingVertical: 8 }}
        >
          <Text>{option.label}</Text>
        </Pressable>
      ))}
    </RNScrollView>
  </PaperMenu>
);

const PhoneAuthForm: React.FC<PhoneAuthFormProps> = ({ onSuccess, onError }) => {
  const themeColor = useThemeColor('primary.500');

  const styles = usePhoneAuthFormStyles();
  const { formik, isSendOTPLoading } = usePhoneAuthForm({
    onSendOTPSuccess: onSuccess,
    onError: onError,
  });

  const { isOpen, onOpen, onClose } = useDisclose();
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

  const nbTheme = useTheme();

  return (
    <View style={{ flex: 1, paddingBottom: 16 }}>
      <View style={{ flex: 1, marginBottom: 32, rowGap: 24 }}>
        <View>
          <Text variant="titleLarge">Login</Text>
        </View>
        <FormControl label={'Mobile Number'}>
          <View style={{ flexDirection: 'row', columnGap: 8, width: '100%' }}>
            <View style={{ flex: 1 }}>
              {renderCountrySelectMenu(
                formik,
                isOpen,
                onOpen,
                onClose,
                handleSelectChange,
                nbTheme.colors.secondary['200'],
                nbTheme.colors.primary['500'],
                nbTheme.sizes['12'],
                nbTheme.fontSizes.md,
              )}
            </View>
            <View
              style={[
                { flex: 3, justifyContent: 'center' },
                styles.inputBox,
                formik.touched.phoneNumber && formik.errors.phoneNumber ? styles.errorStyle : {},
              ]}
            >
              <TextInput
                mode="outlined"
                value={phoneNumber.getFormattedWithoutCountryCode()}
                onChangeText={formik.handleChange('phoneNumber')}
                keyboardType="numeric"
                placeholder={phoneNumberPlaceholder}
                outlineColor={nbTheme.colors.secondary['200']}
                activeOutlineColor={nbTheme.colors.primary['500']}
                style={{ minHeight: nbTheme.sizes['12'], fontSize: nbTheme.fontSizes.md }}
                contentStyle={{ minHeight: nbTheme.sizes['12'] }}
              />
            </View>
          </View>
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <Text style={styles.errorText} variant="bodySmall">
              {formik.errors.phoneNumber}
            </Text>
          ) : null}
        </FormControl>

        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 8, marginTop: 8 }}>
          <Checkbox
            isChecked={isChecked}
            onChange={setIsChecked}
            accessibilityLabel="Agree to privacy policy"
            value="agreePrivacyPolicy"
            icon={<CheckIcon width={12} height={12} color={themeColor} />}
            aria-label="Privacy Policy Checkbox"
          />
          <Text style={{ fontSize: nbTheme.fontSizes.sm, lineHeight: Number(nbTheme.lineHeights.sm) }}>
            By continuing, you agree to our
            <Text
              style={{ color: nbTheme.colors.primary['500'], textDecorationLine: 'underline' }}
              onPress={() => {
                Linking.openURL('https://jalantechnologies.github.io/react-native-template/');
              }}
            >
              {' '}Privacy Policy
            </Text>
          </Text>
        </View>
      </View>

      <PaperButton
        mode="contained"
        disabled={!isChecked}
        loading={isSendOTPLoading}
        onPress={() => formik.handleSubmit()}
        buttonColor={nbTheme.colors.primary['500']}
        textColor={nbTheme.colors.white}
        style={{ borderRadius: nbTheme.radii.sm }}
      >
        Send OTP
      </PaperButton>
    </View>
  );
};

export default PhoneAuthForm;

import {
  VStack,
  Container,
  Heading,
  HStack,
  useDisclose,
  Text,
  Pressable,
  Menu,
  ScrollView,
  Link,
  Box,
  Checkbox,
} from 'native-base';
import React, { useState } from 'react';
import axios from 'axios';
import CheckIcon from 'react-native-template/assets/icons/check.svg';
import { FormControl, Input, Button } from 'react-native-template/src/components';
import { ButtonKind } from 'react-native-template/src/types/button';
import { useThemeColor } from 'react-native-template/src/utils';
import Config from 'react-native-config';
import { Alert } from 'react-native';

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
) => (
  <Menu
    isOpen={isOpen}
    onOpen={onOpen}
    onClose={onClose}
    trigger={triggerProps => (
      <Pressable
        {...triggerProps}
        borderWidth={1}
        justifyContent="center"
        borderColor={'warmGray.300'}
        rounded="sm"
        px={2}
      >
        <Text>{`${formik.values.country} (${formik.values.countryCode})`}</Text>
      </Pressable>
    )}
  >
    <ScrollView maxH={'200px'}>
      {CountrySelectOptions.map(option => (
        <Menu.Item
          key={option.value}
          onPress={() => {
            handleSelectChange(option.value);
            onClose();
          }}
        >
          {option.label}
        </Menu.Item>
      ))}
    </ScrollView>
  </Menu>
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

  const [isTempUserLoading, setIsTempUserLoading] = useState(false);

  const handleCreateTempUser = async () => {
    const apiBaseUrl = (Config.API_BASE_URL || '').replace(/\/+$/, '');

    if (!apiBaseUrl) {
      Alert.alert('API base URL missing', 'Set API_BASE_URL in your env to test the database.');
      return;
    }

    setIsTempUserLoading(true);
    try {
      const payload = {
        email: `preview-temp-${Date.now()}@example.com`,
        source: 'permanent-preview-debug',
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(`${apiBaseUrl}/temporary-users`, payload);

      const userId = (response.data && (response.data.id || response.data.user_id)) || 'unknown';
      Alert.alert(
        'Temporary user created',
        `Base URL: ${apiBaseUrl}\nID: ${userId}`,
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Unknown error';

      Alert.alert('Temporary user creation failed', `Base URL: ${apiBaseUrl}\n${message}`);
    } finally {
      setIsTempUserLoading(false);
    }
  };

  return (
    <Box flex={1} pb={4}>
      <VStack space={6} flex={1} mb={8}>
        <Container>
          <Heading size="lg">Login</Heading>
        </Container>
        <FormControl label={'Mobile Number'}>
          <HStack space={2} width="100%">
            {renderCountrySelectMenu(formik, isOpen, onOpen, onClose, handleSelectChange)}
            <Box
              flex={3}
              justifyContent="center"
              style={[
                styles.inputBox,
                formik.touched.phoneNumber && formik.errors.phoneNumber ? styles.errorStyle : {},
              ]}
            >
              <Input
                value={phoneNumber.getFormattedWithoutCountryCode()}
                onChangeText={formik.handleChange('phoneNumber')}
                keyboardType="numeric"
                placeholder={phoneNumberPlaceholder}
              />
            </Box>
          </HStack>
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <Text style={styles.errorText}>{formik.errors.phoneNumber}</Text>
          ) : null}
        </FormControl>

        <HStack alignItems="flex-start" space={2} mt={2}>
          <Checkbox
            isChecked={isChecked}
            onChange={setIsChecked}
            accessibilityLabel="Agree to privacy policy"
            value="agreePrivacyPolicy"
            icon={<CheckIcon width={12} height={12} color={themeColor} />}
            aria-label="Privacy Policy Checkbox"
            mt={0.5}
          />
          <HStack flexWrap="wrap" alignItems="baseline" flex={1}>
            <Text fontSize="sm">By continuing, you agree to our </Text>
            <Link
              _text={{ color: 'primary.500', underline: true, fontSize: 'sm' }}
              href="https://jalantechnologies.github.io/react-native-template/"
              isExternal
            >
              Privacy Policy
            </Link>
          </HStack>
        </HStack>
      </VStack>

      <Button
        disabled={!isChecked}
        isLoading={isSendOTPLoading}
        onClick={() => formik.handleSubmit()}
        kind={ButtonKind.CONTAINED}
      >
        Send OTP
      </Button>

      {/* Temporary: hit API_BASE_URL to confirm environment database wiring */}
      <Button
        isLoading={isTempUserLoading}
        onClick={handleCreateTempUser}
        kind={ButtonKind.OUTLINED}
      >
        Create Temp User (env check)
      </Button>
    </Box>
  );
};

export default PhoneAuthForm;

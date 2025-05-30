import CheckIcon from 'boilerplate-react-native/assets/icons/check.svg';
import { FormControl, Input, Button } from 'boilerplate-react-native/src/components';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { useThemeColor } from 'boilerplate-react-native/src/utils';
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
    countryCode: formik.values.countryCode.replace('+', ''),
    phoneNumber: formik.values.phoneNumber,
  });

  const phoneNumberPlaceholder = new PhoneNumber({
    countryCode: formik.values.countryCode.replace('+', ''),
    phoneNumber: '9999999999',
  }).getFormattedWithoutCountryCode();

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

        <HStack alignItems="center" space={2} mt={2}>
          <Checkbox
            isChecked={isChecked}
            onChange={setIsChecked}
            accessibilityLabel="Agree to privacy policy"
            value="agreePrivacyPolicy"
            icon={<CheckIcon width={12} height={12} color={themeColor} />}
            aria-label="Privacy Policy Checkbox"
          />
          <Text fontSize="sm" alignSelf={'center'} lineHeight={16}>
            By continuing, you agree to our
            <Link
              _text={{ color: 'primary.500', underline: true, marginLeft: 1 }}
              href="https://jalantechnologies.github.io/boilerplate-react-native/"
              isExternal
            >
              Privacy Policy
            </Link>
          </Text>
        </HStack>
      </VStack>

      <Button
        disabled={!isChecked}
        isLoading={isSendOTPLoading}
        onClick={() => formik.handleSubmit()}
        kind={ButtonKind.PRIMARY}
      >
        Send OTP
      </Button>
    </Box>
  );
};

export default PhoneAuthForm;

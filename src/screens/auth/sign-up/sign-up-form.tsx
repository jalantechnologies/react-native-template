import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Input } from '@rneui/themed';
import tw from '../../../lib/tailwind';
import { CountryPicker } from 'react-native-country-codes-picker';
import useSignUpForm from './sign-up-form.hook';
import { AsyncError } from '../../../types';

interface SignUpFormProps {
  onError: (err: AsyncError) => void;
  onSendOTPSuccess: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onError,
  onSendOTPSuccess,
}) => {
  const [countryPickerShow, setCountryPickerShow] = useState(false);
  const [countryPickerLabel, setCountryPickerLabel] = useState('🇺🇸 US (+1)');

  const { formik, isSendOTPLoading } = useSignUpForm({
    onError,
    onSendOTPSuccess,
  });

  return (
    <>
      <View style={tw`self-start`}>
        <Text style={tw`text-title-xl`}>Sign Up</Text>
      </View>
      <View style={tw`gap-2`}>
        <Text style={tw`text-base`}>Phone Number</Text>
        <View style={tw`w-full flex-row gap-2`}>
          <View style={tw`h-10`}>
            <TouchableOpacity
              onPress={() => {
                setCountryPickerShow(true);
              }}
              style={tw`border-2 rounded-[1] border-slate-400 justify-center px-1 ios:h-11 android:h-12`}
            >
              <Text style={tw`text-sm`}>{countryPickerLabel}</Text>
            </TouchableOpacity>
            <CountryPicker
              show={countryPickerShow}
              pickerButtonOnPress={item => {
                setCountryPickerLabel(
                  `${item.flag} ${item.code} (${item.dial_code})`,
                );
                formik.setFieldValue('countryCode', item.dial_code);
                formik.setFieldValue('country', item.code);
                setCountryPickerShow(false);
              }}
              onBackdropPress={() => setCountryPickerShow(false)}
              style={{
                modal: {
                  height: 500,
                },
              }}
              lang={'en'}
            />
          </View>
          <View style={tw`flex-2`}>
            <Input
              placeholder="Enter your phone number"
              inputMode="numeric"
              containerStyle={tw`px-0`}
              inputStyle={tw`bg-white pl-2`}
              value={formik.values.phoneNumber}
              onChangeText={formik.handleChange('phoneNumber')}
              errorMessage={
                formik.touched.phoneNumber
                  ? formik.errors.phoneNumber
                  : undefined
              }
            />
          </View>
        </View>
        <Button
          loading={isSendOTPLoading}
          title="Get OTP"
          onPress={() => formik.handleSubmit()}
        />
      </View>
    </>
  );
};

export default SignUpForm;

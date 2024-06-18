import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button, Text } from '@rneui/themed';
import useOTPForm from './otp-form-hook';
import { OTPInput } from '../../../components';
import tw from '../../../lib/tailwind';
import { AsyncError } from '../../../types';

interface OTPFormProps {
  countryCode: string;
  isResendEnabled: boolean;
  onError: (err: AsyncError) => void;
  onResendOTPSuccess: () => void;
  onVerifyOTPSuccess: () => void;
  phoneNumber: string;
  remaininingSecondsStr: string;
}

const OTPForm: React.FC<OTPFormProps> = ({
  countryCode,
  isResendEnabled,
  onError,
  onResendOTPSuccess,
  onVerifyOTPSuccess,
  phoneNumber,
  remaininingSecondsStr,
}) => {
  const { formik, handleResendOTP, isVerifyOTPLoading } = useOTPForm({
    onError,
    onResendOTPSuccess,
    onVerifyOTPSuccess,
    countryCode,
    phoneNumber,
  });

  const handleOtpChange = (value: string[]) => {
    formik
      .setFieldValue('otp', value)
      .then()
      .catch(error => {
        onError(error as AsyncError);
      });
  };

  return (
    <>
      <View>
        <Text style={tw`text-title-lg font-bold`}>Verify your Account</Text>
      </View>
      <View style={tw`gap-2`}>
        <Text>
          Enter the 4-digit OTP sent to {countryCode} {phoneNumber}
        </Text>
        <OTPInput onChange={handleOtpChange} />
      </View>
      <View style={tw`gap-4`}>
        <View style={tw`flex-row gap-1`}>
          <Text>Didn't receive the OTP?</Text>
          <TouchableOpacity
            disabled={!isResendEnabled}
            onPress={handleResendOTP}
          >
            <Text
              style={tw`${
                isResendEnabled ? 'text-blue-700' : 'text-slate-500'
              }`}
            >
              {isResendEnabled
                ? 'Resend'
                : `Resend OTP in 00:${remaininingSecondsStr}`}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Verify"
          titleStyle={tw`font-bold`}
          onPress={() => formik.handleSubmit()}
          disabled={!formik.isValid}
          loading={isVerifyOTPLoading}
        />
      </View>
    </>
  );
};

export default OTPForm;

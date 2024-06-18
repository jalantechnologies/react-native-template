import { View, Text } from 'react-native';
import React from 'react';
import useRegistrationForm from './registration-form-hook';
import { Button, Input } from '@rneui/themed';
import tw from '../../../lib/tailwind';
import { AsyncError } from '../../../types';

interface RegistrationFormProps {
  onError: (error: AsyncError) => void;
  onRegistrationSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onError,
  onRegistrationSuccess,
}) => {
  const { formik, isUpdateAccountLoading } = useRegistrationForm({
    onError,
    onRegistrationSuccess,
  });

  return (
    <>
      <View style={tw`self-start px-2`}>
        <Text style={tw`text-title-xl`}>Account Details</Text>
      </View>
      <View style={tw`gap-2`}>
        <View style={tw`w-full flex-row gap-2`}>
          <View style={tw`flex-2`}>
            <Input
              label="First Name"
              value={formik.values.firstName}
              onChangeText={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
              errorMessage={
                formik.touched.firstName ? formik.errors.firstName : undefined
              }
              inputContainerStyle={tw`px-2`}
            />
            <Input
              label="Last Name"
              value={formik.values.lastName}
              onChangeText={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
              errorMessage={
                formik.touched.lastName ? formik.errors.lastName : undefined
              }
              inputContainerStyle={tw`px-2`}
            />
          </View>
        </View>
        <Button
          loading={isUpdateAccountLoading}
          title="Submit"
          onPress={() => formik.handleSubmit()}
          disabled={!formik.isValid}
        />
      </View>
    </>
  );
};

export default RegistrationForm;

import { Button, FormControl, Input, KeyboardAvoidingView, Toast, VStack } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';

import { ProfileStackScreenProps } from '../../../../@types/navigation';
import { AsyncError } from '../../../types';
import ProfileLayout from '../profile-layout';

import useProfileUpdateForm from './profile-update-form.hook';

const EditProfile: React.FC<ProfileStackScreenProps<'EditProfile'>> = ({ navigation }) => {
  const onProfileUpdateSuccess = () => {
    Toast.show({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully',
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const onProfileUpdateError = (err: AsyncError) => {
    Toast.show({
      title: 'Profile Update Failed',
      description: err.message,
    });
  };

  const { formik, isUpdateAccountLoading } = useProfileUpdateForm({
    onProfileUpdateError,
    onProfileUpdateSuccess,
  });

  return (
    <ProfileLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        flex={1}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        justifyContent={'space-between'}
      >
        <VStack space={4}>
          <FormControl isInvalid={formik.touched.firstName && Boolean(formik.errors.firstName)}>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              onChangeText={formik.handleChange('firstName')}
              placeholder={'First Name'}
              value={formik.values.firstName}
            />
            <FormControl.ErrorMessage>{formik.errors.firstName}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl isInvalid={formik.touched.lastName && Boolean(formik.errors.lastName)}>
            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              onChangeText={formik.handleChange('lastName')}
              placeholder={'Last Name'}
              value={formik.values.lastName}
            />
          </FormControl>

          <FormControl isDisabled isReadOnly>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input value={formik.values.phoneNumber} />
          </FormControl>
        </VStack>

        <Button onPress={() => formik.handleSubmit()} isLoading={isUpdateAccountLoading}>
          Save Changes
        </Button>
      </KeyboardAvoidingView>
    </ProfileLayout>
  );
};

export default EditProfile;

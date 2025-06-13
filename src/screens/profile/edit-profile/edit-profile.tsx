import { Button, FormControl, Input } from 'boilerplate-react-native/src/components';
import { KeyboardAvoidingView, Toast, VStack } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';

import { ProfileStackScreenProps } from '../../../../@types/navigation';
import Divider from '../../../components/divider';
import { DividerOrientation } from '../../../components/divider/divider.styles';
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
          <FormControl error={formik.errors.firstName} label={'First Name'}>
            <Input
              onChangeText={formik.handleChange('firstName')}
              placeholder={'First Name'}
              value={formik.values.firstName}
            />
          </FormControl>

          <FormControl error={formik.errors.lastName} label={'Last Name'}>
            <Input
              onChangeText={formik.handleChange('lastName')}
              placeholder={'Last Name'}
              value={formik.values.lastName}
            />
          </FormControl>

          <FormControl label={'Phone Number'}>
            <Input value={formik.values.phoneNumber} editable={false} disabled={true} />
          </FormControl>
        </VStack>

        <VStack space={4} mt={8}>
          <Divider
            orientation={DividerOrientation.Horizontal}
            thickness={1}
            style={{ marginVertical: 16 }}
            length="100%"
          />
          <Button onClick={() => formik.handleSubmit()} isLoading={isUpdateAccountLoading}>
            Save Changes
          </Button>
        </VStack>
      </KeyboardAvoidingView>
    </ProfileLayout>
  );
};

export default EditProfile;

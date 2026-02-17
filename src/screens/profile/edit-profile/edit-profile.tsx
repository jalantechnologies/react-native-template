import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';

import { ProfileStackScreenProps } from '../../../../@types/navigation';
import { AppButton, AppTextInput } from '../../../components';
import { useToast } from '../../../contexts';
import { AsyncError } from '../../../types';
import ProfileLayout from '../profile-layout';
import useProfileUpdateForm from './profile-update-form.hook';

const EditProfile: React.FC<ProfileStackScreenProps<'EditProfile'>> = ({ navigation }) => {
  const toast = useToast();

  const onProfileUpdateSuccess = () => {
    toast.show('Your profile has been updated successfully');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const onProfileUpdateError = (err: AsyncError) => {
    toast.show(err.message);
  };

  const { formik, isUpdateAccountLoading } = useProfileUpdateForm({
    onProfileUpdateError,
    onProfileUpdateSuccess,
  });

  return (
    <ProfileLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.form}>
          <AppTextInput
            label="First Name"
            onChangeText={formik.handleChange('firstName')}
            placeholder="First Name"
            value={formik.values.firstName}
            errorText={formik.errors.firstName}
          />

          <AppTextInput
            label="Last Name"
            onChangeText={formik.handleChange('lastName')}
            placeholder="Last Name"
            value={formik.values.lastName}
            errorText={formik.errors.lastName}
          />

          <AppTextInput
            label="Phone Number"
            value={formik.values.phoneNumber}
            editable={false}
            disabled={true}
          />
        </View>

        <AppButton
          onPress={() => formik.handleSubmit()}
          loading={isUpdateAccountLoading}
          style={styles.button}
        >
          Save Changes
        </AppButton>
      </KeyboardAvoidingView>
    </ProfileLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    gap: 16,
  },
  button: {
    marginBottom: 16,
  },
});

export default EditProfile;

import { Toast } from 'native-base';
import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import {
  HelperText,
  TextInput,
  useTheme,
  Text,
  Button,
} from 'react-native-paper';

import { ProfileStackScreenProps } from '../../../../@types/navigation';
import { AsyncError } from '../../../types';
import ProfileLayout from '../profile-layout';

import  { useEditProfileStyles }  from './edit-profile.styles';
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
  const styles = useEditProfileStyles();
  const theme = useTheme();

  return (
    <ProfileLayout>
      <KeyboardAvoidingView
        style={{ flex: 1,justifyContent:'space-between' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={styles.layout}>
          <View>
            <Text style={styles.text}>First Name</Text>
            <TextInput
              mode="outlined"
              placeholder="First Name"
              value={formik.values.firstName}
              onChangeText={formik.handleChange('firstName')}
              activeOutlineColor={theme.colors.primaryContainer}
              style={{ backgroundColor:theme.colors.surface }}
              error={!!formik.errors.firstName}
            />
            <HelperText type="error" visible={!!formik.errors.firstName}>
              {formik.errors.firstName}
            </HelperText>
          </View>

          <View>
            <Text style={styles.text}>Last Name</Text>
            <TextInput
              mode="outlined"
              placeholder="Last Name"
              value={formik.values.lastName}
              onChangeText={formik.handleChange('lastName')}
              activeOutlineColor={theme.colors.primaryContainer}
              style={{ backgroundColor: theme.colors.surface }}
              error={!!formik.errors.lastName}
            />
            <HelperText type="error" visible={!!formik.errors.lastName}>
              {formik.errors.lastName}
            </HelperText>
          </View>

          <View>
            <Text style={styles.text}>Phone Number</Text>
            <TextInput
              mode="outlined"
              value={formik.values.phoneNumber}
              editable={false}
              disabled
              style={{ backgroundColor: theme.colors.surfaceVariant }}
            />
            <HelperText
              type="error"
              visible={!!formik.errors.phoneNumber}
            >
              {formik.errors.phoneNumber}
            </HelperText>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => formik.handleSubmit()}
          loading={isUpdateAccountLoading}
        >
          Save Changes
        </Button>
      </KeyboardAvoidingView>
    </ProfileLayout>
  );
};

export default EditProfile;

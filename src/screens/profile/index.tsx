import React, { useState } from 'react';
import { Button, FormControl, Input, Toast, VStack } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncError } from 'boilerplate-react-native/src/types';
import useProfileUpdateForm from './profile-update-form.hook';
import ProfileLayout from './profile-layout';
import AccountDeleteModal from './account-delete-modal';
import { useAccountContext, useAuthContext } from 'boilerplate-react-native/src/contexts';
import { AuthenticatedDrawerScreenProps } from 'boilerplate-react-native/@types/navigation';

const Profile: React.FC<AuthenticatedDrawerScreenProps<'Profile'>['navigation']> = ({
  navigation,
}) => {
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] = useState(false);

  const { deleteAccount, isDeleteAccountLoading } = useAccountContext();
  const { logout } = useAuthContext();

  const onAccountDeleteSuccess = () => {
    logout();
    Toast.show({
      title: 'Account Deleted',
      description: 'Your account has been deleted successfully',
    });
  };

  const onAccountDeleteError = (err: AsyncError) => {
    Toast.show({
      title: 'Account Deletion Failed',
      description: err.message,
    });
  };

  const handleDeleteAccount = async () => {
    setIsAccountDeleteModalOpen(false);
    deleteAccount()
      .then(() => {
        onAccountDeleteSuccess();
      })
      .catch((err: AsyncError) => {
        onAccountDeleteError(err);
      });
  };

  const onProfileUpdateSuccess = () => {
    Toast.show({
      title: 'Profile Updated',
      description: 'Your profile has been updated successfully',
      placement: 'top',
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Profile' }],
    });
  };

  const onProfileUpdateError = (err: AsyncError) => {
    Toast.show({
      title: 'Profile Update Failed',
      description: err.message,
      placement: 'top',
    });
  };

  const { formik, isUpdateAccountLoading } = useProfileUpdateForm({
    onProfileUpdateError,
    onProfileUpdateSuccess,
  });

  return (
    <ProfileLayout>
      <VStack w={'100%'} space={4}>
        <FormControl isInvalid={formik.touched.firstName && Boolean(formik.errors.firstName)}>
          <FormControl.Label>First Name</FormControl.Label>
          <Input
            onChangeText={formik.handleChange('firstName')}
            placeholder={'First Name'}
            value={formik.values.firstName}
          />
          <FormControl.ErrorMessage>{formik.errors.firstName}</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isRequired={false}>
          <FormControl.Label>Last Name</FormControl.Label>
          <Input
            onChangeText={formik.handleChange('lastName')}
            placeholder={'Last Name'}
            value={formik.values.lastName}
          />
          <FormControl.ErrorMessage>Last name is required</FormControl.ErrorMessage>
        </FormControl>

        <FormControl isDisabled isReadOnly>
          <FormControl.Label>Phone Number</FormControl.Label>
          <Input value={formik.values.phoneNumber} />
        </FormControl>

        <Button
          alignSelf={'flex-end'}
          mt={4}
          onPress={() => setIsAccountDeleteModalOpen(true)}
          startIcon={<Icon name="trash" size={20} color="white" />}
          variant={'danger'}
        >
          Delete Account
        </Button>
      </VStack>

      <Button onPress={() => formik.handleSubmit()} isLoading={isUpdateAccountLoading}>
        Save Changes
      </Button>

      <AccountDeleteModal
        handleDeleteAccountPress={handleDeleteAccount}
        isDeleteAccountLoading={isDeleteAccountLoading}
        isModalOpen={isAccountDeleteModalOpen}
        setIsModalOpen={setIsAccountDeleteModalOpen}
      />
    </ProfileLayout>
  );
};

export default Profile;

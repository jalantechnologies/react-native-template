import { Button } from 'boilerplate-react-native/src/components';
import { Box, Divider, Icon, Toast, VStack } from 'native-base';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ProfileStackScreenProps } from '../../../../@types/navigation';
import { useAccountContext, useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';
import ProfileLayout from '../profile-layout';

import AccountDeleteModal from './account-delete-modal';
import ProfileAction from './profile-action';
import ProfileInfoSection from './profile-info-section';

const Profile: React.FC<ProfileStackScreenProps<'Home'>> = ({ navigation }) => {
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] = useState(false);

  const { deleteAccount, isDeleteAccountLoading, accountDetails } = useAccountContext();
  const { logout } = useAuthContext();

  const handleAccountDeleteSuccess = () => {
    logout();
    Toast.show({
      title: 'Account Deleted',
      description: 'Your account has been deleted successfully',
    });
  };

  const handleAccountDeleteError = (err: AsyncError) => {
    Toast.show({
      title: 'Account Deletion Failed',
      description: err.message,
    });
  };

  const handleDeleteAccount = async () => {
    setIsAccountDeleteModalOpen(false);
    deleteAccount()
      .then(() => {
        handleAccountDeleteSuccess();
      })
      .catch((err: AsyncError) => {
        handleAccountDeleteError(err);
      });
  };

  const handleEditProfilePress = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <ProfileLayout>
      <VStack w={'100%'} space={4} divider={<Divider />}>
        <ProfileInfoSection
          accountDetails={accountDetails}
          handleEditProfilePress={handleEditProfilePress}
        />
        <ProfileAction
          title={'Delete Account'}
          icon={'delete'}
          onPress={() => setIsAccountDeleteModalOpen(true)}
        />
      </VStack>

      <AccountDeleteModal
        handleDeleteAccountPress={handleDeleteAccount}
        isDeleteAccountLoading={isDeleteAccountLoading}
        isModalOpen={isAccountDeleteModalOpen}
        setIsModalOpen={setIsAccountDeleteModalOpen}
      />

      <Box w="50%" alignSelf="center" position="absolute" bottom={4}>
        <Button
          onClick={logout}
          startEnhancer={<Icon as={<MaterialIcons name="logout" />} color={'secondary.50'} />}
        >
          Logout
        </Button>
      </Box>
    </ProfileLayout>
  );
};

export default Profile;

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, useTheme } from 'react-native-paper';
import DeleteIcon from 'react-native-template/assets/icons/delete.svg';
import LogoutIcon from 'react-native-template/assets/icons/logout.svg';

import { ProfileStackScreenProps } from '../../../../@types/navigation';
import { useAccountContext, useAuthContext, useToast } from '../../../contexts';
import { AsyncError } from '../../../types';
import ProfileLayout from '../profile-layout';

import AccountDeleteModal from './account-delete-modal';
import ProfileAction from './profile-action';
import ProfileInfoSection from './profile-info-section';

const Profile: React.FC<ProfileStackScreenProps<'Home'>> = ({ navigation }) => {
  const theme = useTheme() as any;
  const toast = useToast();

  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] = useState(false);

  const { deleteAccount, isDeleteAccountLoading, accountDetails } = useAccountContext();
  const { logout } = useAuthContext();

  const handleAccountDeleteSuccess = () => {
    logout();
    toast.show('Your account has been deleted successfully');
  };

  const handleAccountDeleteError = (err: AsyncError) => {
    toast.show(err.message);
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
      <View style={styles.container}>
        <ProfileInfoSection
          accountDetails={accountDetails}
          handleEditProfilePress={handleEditProfilePress}
        />
        <Divider />
        <ProfileAction
          title={'Delete Account'}
          icon={<DeleteIcon width={20} height={20} fill={theme.colors.primary} />}
          onPress={() => setIsAccountDeleteModalOpen(true)}
        />
        <Divider />
      </View>

      <AccountDeleteModal
        handleDeleteAccountPress={handleDeleteAccount}
        isDeleteAccountLoading={isDeleteAccountLoading}
        isModalOpen={isAccountDeleteModalOpen}
        setIsModalOpen={setIsAccountDeleteModalOpen}
      />

      <View style={styles.logoutContainer}>
        <Button
          mode="contained"
          onPress={logout}
          icon={({ size, color }) => <LogoutIcon width={size} height={size} fill="white" />}
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </View>
    </ProfileLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  logoutContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  logoutButton: {
    width: '80%',
  },
});

export default Profile;

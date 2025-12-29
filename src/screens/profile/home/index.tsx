import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme, Divider, Snackbar, Button } from 'react-native-paper';

import DeleteIcon from 'react-native-template/assets/icons/delete.svg';
import LogoutIcon from 'react-native-template/assets/icons/logout.svg';

import { ProfileStackScreenProps } from '../../../../@types/navigation';
import { useAccountContext, useAuthContext } from '../../../contexts';
import { AsyncError } from '../../../types';

import ProfileLayout from '../profile-layout';
import { useStyles } from './styles';
import AccountDeleteModal from './account-delete-modal';
import ProfileAction from './profile-action';
import ProfileInfoSection from './profile-info-section';

const Profile: React.FC<
  ProfileStackScreenProps<'Home'>
> = ({ navigation }) => {
  const { colors } = useTheme();
  const styles = useStyles();

  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] =
    useState(false);

  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
  });

  const { deleteAccount, isDeleteAccountLoading, accountDetails } =
    useAccountContext();
  const { logout } = useAuthContext();

  const handleAccountDeleteSuccess = () => {
    logout();
    setSnackbar({
      visible: true,
      message: 'Your account has been deleted successfully',
    });
  };

  const handleAccountDeleteError = (err: AsyncError) => {
    setSnackbar({
      visible: true,
      message: err.message,
    });
  };

  const handleDeleteAccount = async () => {
    setIsAccountDeleteModalOpen(false);
    deleteAccount()
      .then(handleAccountDeleteSuccess)
      .catch(handleAccountDeleteError);
  };

  const handleEditProfilePress = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <ProfileLayout>
      <View style={styles.profileSpacing}>
        <ProfileInfoSection
          accountDetails={accountDetails}
          handleEditProfilePress={handleEditProfilePress}
        />

        <Divider style={{ marginVertical: 12 }} />

        <ProfileAction
          title="Delete Account"
          icon={
            <DeleteIcon
              width={20}
              height={20}
              fill={colors.primary}
            />
          }
          onPress={() => setIsAccountDeleteModalOpen(true)}
        />
      </View>

      <AccountDeleteModal
        handleDeleteAccountPress={handleDeleteAccount}
        isDeleteAccountLoading={isDeleteAccountLoading}
        isModalOpen={isAccountDeleteModalOpen}
        setIsModalOpen={setIsAccountDeleteModalOpen}
      />

      <View style={styles.buttonSpacing}>
        <Button
          mode="contained"
          onPress={logout}
          style={styles.button}
          icon={() => (
            <LogoutIcon
              width={20}
              height={20}
              fill={colors.onPrimary}
            />
          )}
        >
          Logout
        </Button>
      </View>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() =>
          setSnackbar({ visible: false, message: '' })
        }
      >
        {snackbar.message}
      </Snackbar>
    </ProfileLayout>
  );
};

export default Profile;

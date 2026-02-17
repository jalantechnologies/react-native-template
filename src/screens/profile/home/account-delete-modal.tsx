import React from 'react';
import { useTheme } from 'react-native-paper';
import { AppDialog } from '../../../components';

interface AccountDeleteModalProps {
  handleDeleteAccountPress: () => void;
  isDeleteAccountLoading: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const AccountDeleteModal: React.FC<AccountDeleteModalProps> = ({
  handleDeleteAccountPress,
  isDeleteAccountLoading,
  isModalOpen,
  setIsModalOpen,
}) => {
  const theme = useTheme();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <AppDialog
      visible={isModalOpen}
      onDismiss={handleModalClose}
      title="Delete Account"
      content="Are you sure you want to delete your account?"
      onConfirm={handleDeleteAccountPress}
      confirmLabel="Delete"
      confirmButtonColor={theme.colors.error}
      loading={isDeleteAccountLoading}
    />
  );
};

export default AccountDeleteModal;

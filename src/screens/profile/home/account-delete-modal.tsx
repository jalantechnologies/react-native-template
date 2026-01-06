import { Box, Text } from 'native-base';
import React from 'react';
import { Button,useTheme } from 'react-native-paper';
import DeleteIcon from 'react-native-template/assets/icons/delete.svg';
import {  Modal } from 'react-native-template/src/components';

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
    <Modal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
      <Modal.Header title="Delete Account" onClose={handleModalClose} />
      <Modal.Body>
        <Box alignItems="center">
          <Text textAlign={'center'}>Are you sure you want to delete your account?</Text>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Box flex={1} mr={2}>
            <Button
              mode="outlined"
              onPress={handleModalClose}
              theme={{
                colors: {
                  outline: theme.colors.primary,
                },
              }}
            >
              Cancel
            </Button>
        </Box>
        <Box flex={1} ml={2}>
            <Button
              mode="contained"
              onPress={handleDeleteAccountPress}
              loading={isDeleteAccountLoading}
              buttonColor={theme.colors.error}
              icon={() => (
                <DeleteIcon width={16} height={16} fill={theme.colors.onError} />
              )}>

              Delete
            </Button>
        </Box>
      </Modal.Footer>
    </Modal>
  );
};

export default AccountDeleteModal;

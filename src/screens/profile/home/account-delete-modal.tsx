import { Box, Text, useTheme } from 'native-base';
import React from 'react';
import DeleteIcon from 'react-native-template/assets/icons/delete.svg';
import { Button, Modal } from 'react-native-template/src/components';
import { ButtonKind, ButtonColor } from 'react-native-template/src/types/button';

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
          <Button onClick={handleModalClose} kind={ButtonKind.OUTLINED}>
            Cancel
          </Button>
        </Box>
        <Box flex={1} ml={2}>
          <Button
            isLoading={isDeleteAccountLoading}
            onClick={handleDeleteAccountPress}
            kind={ButtonKind.CONTAINED}
            color={ButtonColor.DANGER}
            startEnhancer={
              <DeleteIcon width={20} height={20} fill={theme.colors.secondary['50']} />
            }
          >
            Delete
          </Button>
        </Box>
      </Modal.Footer>
    </Modal>
  );
};

export default AccountDeleteModal;

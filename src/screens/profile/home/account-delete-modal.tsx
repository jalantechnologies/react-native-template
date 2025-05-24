import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'boilerplate-react-native/src/components';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { Box, Text } from 'native-base';
import React from 'react';

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
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isModalOpen={isModalOpen} onRequestClose={handleModalClose}>
      <ModalHeader title="Delete Account" onClose={handleModalClose} />
      <ModalBody>
        <Text>Are you sure you want to delete your account?</Text>
      </ModalBody>
      <ModalFooter>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
          <Button onClick={handleModalClose} kind={ButtonKind.TERTIARY} width="48%">
            Cancel
          </Button>
          <Button
            isLoading={isDeleteAccountLoading}
            onClick={handleDeleteAccountPress}
            kind={ButtonKind.DANGER}
            width="48%"
          >
            Delete
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};

export default AccountDeleteModal;

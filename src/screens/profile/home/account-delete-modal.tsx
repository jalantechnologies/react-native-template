import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'boilerplate-react-native/src/components';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { Box, Icon, Text } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
        <Box alignItems="center">
          <Icon as={<MaterialIcons name="delete" />} size={6} color="danger.600" mb={4} />
          <Text textAlign={'center'}>Are you sure you want to delete your account?</Text>
        </Box>
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
            startEnhancer={<Icon as={<MaterialIcons name="delete" />} color={'secondary.50'} />}
          >
            Delete
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};

export default AccountDeleteModal;

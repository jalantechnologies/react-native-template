import React from 'react';
import { Box, Button, Heading, Icon, Modal, Text } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useWindowDimensions } from 'react-native';

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
  const { height } = useWindowDimensions();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal _backdrop={{ height }} isOpen={isModalOpen} onClose={handleModalClose}>
      <Modal.Content>
        <Modal.Header>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            <Heading>Delete Account</Heading>
            <Icon size={6} as={<MaterialIcons name="close" />} onPress={handleModalClose} />
          </Box>
        </Modal.Header>
        <Modal.Body>
          <Text>Are you sure you want to delete your account?</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={'subtle'} onPress={handleModalClose}>
            Cancel
          </Button>
          <Button
            isLoading={isDeleteAccountLoading}
            onPress={handleDeleteAccountPress}
            variant={'danger'}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AccountDeleteModal;

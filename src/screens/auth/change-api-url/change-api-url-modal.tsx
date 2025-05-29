import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'boilerplate-react-native/src/components';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { useLocalStorage } from 'boilerplate-react-native/src/utils';
import { Box, Toast } from 'native-base';
import React, { useState } from 'react';
import Config from 'react-native-config';

interface ChangeApiUrlModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const ChangeApiUrlModal: React.FC<ChangeApiUrlModalProps> = ({ isModalOpen, setIsModalOpen }) => {
  const localStorage = useLocalStorage();

  const [apiBaseUrl, setApiBaseUrl] = useState(
    localStorage.getFromStorage('apiBaseUrl') || (Config.API_BASE_URL as string),
  );

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    if (!apiBaseUrl) {
      Toast.show({
        title: 'API Base URL can not be empty',
      });
      return;
    }

    localStorage.setToStorage('apiBaseUrl', apiBaseUrl);
    handleModalClose();
  };

  return (
    <Modal isModalOpen={isModalOpen} onRequestClose={handleModalClose}>
      <ModalHeader title="Change Base API URL" onClose={handleModalClose} />
      <ModalBody>
        <FormControl label="New Base API URL">
          <Input
            value={apiBaseUrl}
            onChangeText={e => {
              setApiBaseUrl(e);
            }}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter
        onCancel={handleModalClose}
        onConfirm={handleSaveChanges}
        confirmText="Save Changes"
      />
    </Modal>
  );
};

export default ChangeApiUrlModal;

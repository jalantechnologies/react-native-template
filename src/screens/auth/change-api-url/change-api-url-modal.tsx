import { FormControl, Input, Modal } from 'boilerplate-react-native/src/components';
import { ModalProps } from 'boilerplate-react-native/src/components/modal/modal';
import { useLocalStorage } from 'boilerplate-react-native/src/utils';
import { Toast } from 'native-base';
import React, { useState } from 'react';
import Config from 'react-native-config';

const ChangeApiUrlModal: React.FC<ModalProps> = ({ isModalOpen, handleModalClose }) => {
  const localStorage = useLocalStorage();

  const [apiBaseUrl, setApiBaseUrl] = useState(
    localStorage.getFromStorage('apiBaseUrl') || (Config.API_BASE_URL as string),
  );

  const handleSaveChanges = () => {
    if (!apiBaseUrl) {
      Toast.show({
        title: 'API Base URL can not be empty',
      });
      return;
    }

    localStorage.setToStorage('apiBaseUrl', apiBaseUrl);

    if (handleModalClose) {
      handleModalClose();
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
      <Modal.Header title="Change Base API URL" onClose={handleModalClose} />
      <Modal.Body>
        <FormControl label="New Base API URL">
          <Input
            value={apiBaseUrl}
            onChangeText={e => {
              setApiBaseUrl(e);
            }}
          />
        </FormControl>
      </Modal.Body>
      <Modal.Footer
        onCancel={handleModalClose}
        onConfirm={handleSaveChanges}
        confirmText="Save Changes"
      />
    </Modal>
  );
};

export default ChangeApiUrlModal;

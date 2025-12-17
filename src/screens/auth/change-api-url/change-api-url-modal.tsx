import { Toast } from 'native-base';
import React, { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { FormControl, Input, Modal } from 'react-native-template/src/components';
import { ModalProps } from 'react-native-template/src/components/modal/modal';
import { useLocalStorage } from 'react-native-template/src/utils';

const ChangeApiUrlModal: React.FC<ModalProps> = ({ isModalOpen, handleModalClose }) => {
  const localStorage = useLocalStorage();

  const [apiBaseUrl, setApiBaseUrl] = useState(Config.API_BASE_URL as string);

  useEffect(() => {
    const loadApiBaseUrl = async () => {
      const storedUrl = await localStorage.getFromStorage('apiBaseUrl');
      if (storedUrl) {
        setApiBaseUrl(storedUrl);
      }
    };
    loadApiBaseUrl();
  }, [localStorage]);

  const handleSaveChanges = async () => {
    if (!apiBaseUrl) {
      Toast.show({
        title: 'API Base URL can not be empty',
      });
      return;
    }

    await localStorage.setToStorage('apiBaseUrl', apiBaseUrl);

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

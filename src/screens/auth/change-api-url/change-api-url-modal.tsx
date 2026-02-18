import React, { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { Button, Dialog, Portal } from 'react-native-paper';

import { AppTextInput } from '../../../components';
import { useToast } from '../../../contexts';
import { useLocalStorage } from '../../../utils';

interface ChangeApiUrlModalProps {
  isModalOpen: boolean;
  handleModalClose: () => void;
}

const ChangeApiUrlModal: React.FC<ChangeApiUrlModalProps> = ({ isModalOpen, handleModalClose }) => {
  const localStorage = useLocalStorage();
  const toast = useToast();

  const [apiBaseUrl, setApiBaseUrl] = useState(Config.API_BASE_URL as string);

  useEffect(() => {
    const loadApiBaseUrl = async () => {
      const storedUrl = await localStorage.getFromStorage('apiBaseUrl');
      if (storedUrl) {
        setApiBaseUrl(storedUrl);
      }
    };
    loadApiBaseUrl();
  }, []);

  const handleSaveChanges = async () => {
    if (!apiBaseUrl) {
      toast.show('API Base URL can not be empty');
      return;
    }

    await localStorage.setToStorage('apiBaseUrl', apiBaseUrl);
    toast.show('API URL updated successfully');
    handleModalClose();
  };

  return (
    <Portal>
      <Dialog visible={isModalOpen} onDismiss={handleModalClose}>
        <Dialog.Title>Change Base API URL</Dialog.Title>
        <Dialog.Content>
          <AppTextInput
            label="New Base API URL"
            value={apiBaseUrl}
            onChangeText={setApiBaseUrl}
            containerStyle={{ marginBottom: 0 }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleModalClose}>Cancel</Button>
          <Button mode="contained" onPress={handleSaveChanges}>Save Changes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ChangeApiUrlModal;

import React, { useState } from 'react';
import Config from 'react-native-config';
import { Button, Dialog, Portal, Snackbar, TextInput } from 'react-native-paper';
import { useLocalStorage } from 'react-native-template/src/utils';

interface ChangeApiUrlModalProps {
  isModalOpen: boolean;
  handleModalClose?: () => void;
}

const ChangeApiUrlModal: React.FC<ChangeApiUrlModalProps> = ({ isModalOpen, handleModalClose }) => {
  const localStorage = useLocalStorage();

  const [apiBaseUrl, setApiBaseUrl] = useState(
    localStorage.getFromStorage('apiBaseUrl') || (Config.API_BASE_URL as string),
  );
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const handleSaveChanges = () => {
    if (!apiBaseUrl) {
      setSnackbarMessage('API Base URL cannot be empty');
      setSnackbarVisible(true);
      return;
    }

    localStorage.setToStorage('apiBaseUrl', apiBaseUrl);

    if (handleModalClose) {
      handleModalClose();
    }
  };

  return (
    <Portal>
      <Dialog visible={isModalOpen} onDismiss={handleModalClose}>
        <Dialog.Title>Change Base API URL</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="New Base API URL"
            value={apiBaseUrl}
            onChangeText={setApiBaseUrl}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleModalClose}>Cancel</Button>
          <Button onPress={handleSaveChanges}>Save Changes</Button>
        </Dialog.Actions>
      </Dialog>
      <Snackbar visible={snackbarVisible} onDismiss={() => setSnackbarVisible(false)} duration={3000}>
        {snackbarMessage}
      </Snackbar>
    </Portal>
  );
};

ChangeApiUrlModal.defaultProps = {
  handleModalClose: undefined,
};

export default ChangeApiUrlModal;

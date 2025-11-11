import React, { useState } from 'react';
import Config from 'react-native-config';
import { Button, Dialog, HelperText, Portal, TextInput } from 'react-native-paper';
import { useLocalStorage } from 'react-native-template/src/utils';

interface ChangeApiUrlModalProps {
  handleModalClose: () => void;
  isModalOpen: boolean;
}

const ChangeApiUrlModal: React.FC<ChangeApiUrlModalProps> = ({ handleModalClose, isModalOpen }) => {
  const localStorage = useLocalStorage();

  const [apiBaseUrl, setApiBaseUrl] = useState(
    localStorage.getFromStorage('apiBaseUrl') || (Config.API_BASE_URL as string),
  );
  const [hasValidationError, setHasValidationError] = useState(false);

  const handleDismiss = () => {
    setHasValidationError(false);
    handleModalClose();
  };

  const handleSaveChanges = () => {
    if (!apiBaseUrl?.trim()) {
      setHasValidationError(true);
      return;
    }

    localStorage.setToStorage('apiBaseUrl', apiBaseUrl);

    handleModalClose();
  };

  return (
    <Portal>
      <Dialog onDismiss={handleDismiss} visible={isModalOpen}>
        <Dialog.Title>Change Base API URL</Dialog.Title>
        <Dialog.Content>
          <TextInput
            autoCorrect={false}
            error={hasValidationError}
            label="New Base API URL"
            mode="outlined"
            onChangeText={value => {
              setHasValidationError(false);
              setApiBaseUrl(value);
            }}
            multiline={false}
            numberOfLines={1}
            value={apiBaseUrl}
          />
          <HelperText type="error" visible={hasValidationError}>
            API Base URL cannot be empty.
          </HelperText>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDismiss}>Cancel</Button>
          <Button onPress={handleSaveChanges}>Save Changes</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ChangeApiUrlModal;

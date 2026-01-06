import { Toast } from 'native-base';
import React, { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { Text, useTheme, TextInput, Button } from 'react-native-paper';
import { Modal } from 'react-native-template/src/components';
import { ModalProps } from 'react-native-template/src/components/modal/modal';
import { useLocalStorage } from 'react-native-template/src/utils';

import { ChangeApiUrlStyles } from './change-api-url.styles';

const ChangeApiUrlModal: React.FC<ModalProps> = ({ isModalOpen, handleModalClose }) => {
  const localStorage = useLocalStorage();
  const theme = useTheme();
  const styles = ChangeApiUrlStyles();

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
<Text style={styles.text}>New Base API URL</Text>
          <TextInput
            value={apiBaseUrl}
            onChangeText={text => {
              setApiBaseUrl(text);
            }}
            mode="outlined"
            autoCapitalize="none"
            autoCorrect={false}
            style={{ backgroundColor: theme.colors.surface }}
          />
      </Modal.Body>
      <Modal.Footer>
        <Button
            mode="outlined"
            style={styles.button}
            onPress={handleModalClose}
            theme={{
              colors: {
                outline: theme.colors.primary,
              },
            }}>
            Cancel
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleSaveChanges}>
            Save Changes
          </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default ChangeApiUrlModal;

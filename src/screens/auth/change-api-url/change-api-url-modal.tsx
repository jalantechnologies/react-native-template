import { Toast } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Config from 'react-native-config';
import { Text, TextInput, Button } from 'react-native-paper';
import { Modal } from 'react-native-template/src/components';
import { ModalProps } from 'react-native-template/src/components/modal/modal';
import { useLocalStorage } from 'react-native-template/src/utils';

import { useChangeApiUrlStyles } from './change-api-url.styles';

const ChangeApiUrlModal: React.FC<ModalProps> = ({ isModalOpen, handleModalClose }) => {
  const localStorage = useLocalStorage();
  const styles = useChangeApiUrlStyles();

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
      <Text style={styles.text} variant="titleSmall">New Base API URL</Text>
          <TextInput
            value={apiBaseUrl}
            onChangeText={text => {
              setApiBaseUrl(text);
            }}
            mode="outlined"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputTextBox}
          />
      </Modal.Body>
      <Modal.Footer>
        <View style={styles.ButtonSpacing}>
          <Button
            mode="outlined"
            style={styles.button}
            onPress={handleModalClose}>
            Cancel
          </Button>
          <Button
            mode="contained"
            style={styles.button}
            onPress={handleSaveChanges}>
            Save Changes
          </Button>

        </View>


      </Modal.Footer>
    </Modal>
  );
};

export default ChangeApiUrlModal;

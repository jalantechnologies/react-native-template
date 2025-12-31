import React, { useEffect, useState } from 'react';
import Config from 'react-native-config';
import { Dialog, Portal, Text, useTheme, IconButton, TextInput, Button, Snackbar } from 'react-native-paper';
import Close from 'react-native-template/assets/icons/close.svg';
import { ModalProps } from 'react-native-template/src/components/modal/modal';
import { useLocalStorage } from 'react-native-template/src/utils';

import { ChangeApiUrlStyles } from './change-api-url.style';
const ChangeApiUrlModal: React.FC<ModalProps> = ({ isModalOpen, handleModalClose }) => {
  const localStorage = useLocalStorage();
  const theme = useTheme();
  const styles = ChangeApiUrlStyles();

  const [apiBaseUrl, setApiBaseUrl] = useState(Config.API_BASE_URL as string);
  const [snackbarVisible, setSnackbarVisible] = useState(false);


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
      setSnackbarVisible(true);
      return;
    }

    await localStorage.setToStorage('apiBaseUrl', apiBaseUrl);

    if (handleModalClose) {
      handleModalClose();
    }
  };

  return (
    <Portal>
      <Dialog visible={isModalOpen} onDismiss={handleModalClose} style={styles.dialog}>
        <Dialog.Title style={{ marginBottom: 38 }}>
          <Text variant="titleMedium"
            style={styles.heading}  >
            Change Base API URL
          </Text>
        </Dialog.Title>
        <IconButton
          icon={() => (
            <Close width={26} height={26} fill={theme.colors.primary} />
          )}
          onPress={handleModalClose}
          style={styles.close}
        />
        <Dialog.Content>
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

        </Dialog.Content>
        <Dialog.Actions style={styles.buttonSection}>
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
        </Dialog.Actions>

      </Dialog>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        API Base URL cannot be empty
      </Snackbar>

    </Portal>
  );
};

export default ChangeApiUrlModal;

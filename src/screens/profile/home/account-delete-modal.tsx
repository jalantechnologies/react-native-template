import React from 'react';
import { View } from 'react-native';
import { Dialog, Portal, useTheme, IconButton, Text, Button } from 'react-native-paper';
import Close from 'react-native-template/assets/icons/close.svg';
import DeleteIcon from 'react-native-template/assets/icons/delete.svg';

import { useStyles }  from './styles';
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
  const theme = useTheme();
  const styles = useStyles();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Portal>
      <Dialog visible={isModalOpen} onDismiss={handleModalClose} style={styles.dialog} >
        <Dialog.Title>
          <Text variant="titleLarge" style={styles.heading}>
            Delete Account
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
          <View style={styles.deleteText}>
            <Text>
              Are you sure you want to delete your account?
            </Text>
          </View>

        </Dialog.Content>
        <Dialog.Actions>
          <View style={styles.deleteFooter}>
            <Button
              mode="outlined"
              onPress={handleModalClose}
              style={styles.button}
              theme={{
                colors: {
                  outline: theme.colors.primary,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleDeleteAccountPress}
              loading={isDeleteAccountLoading}
              buttonColor={theme.colors.error}
              style={styles.button}
              icon={() => (
                <DeleteIcon width={16} height={16} fill={theme.colors.onError} />
              )}>

              Delete
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AccountDeleteModal;

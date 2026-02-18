import React from 'react';
import { Text } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

interface AppDialogProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  content: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  cancelLabel?: string;
  loading?: boolean;
  confirmButtonColor?: string;
}

const AppDialog: React.FC<AppDialogProps> = ({
  visible,
  onDismiss,
  title,
  content,
  confirmLabel = 'Confirm',
  onConfirm,
  cancelLabel = 'Cancel',
  loading = false,
  confirmButtonColor,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text style={{ fontSize: 16 }}>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} disabled={loading}>{cancelLabel}</Button>
          {onConfirm && (
            <Button 
              onPress={onConfirm} 
              loading={loading} 
              disabled={loading}
              buttonColor={confirmButtonColor}
              mode={confirmButtonColor ? 'contained' : 'text'}
            >
              {confirmLabel}
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AppDialog;

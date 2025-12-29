import React, { useState } from 'react';
import { View } from 'react-native';
import { t } from 'i18next';
import {
  Dialog,
  Portal,
  useTheme,
  IconButton,
  Text,
  Button,
  Snackbar,
} from 'react-native-paper';

import DeleteIcon from 'react-native-template/assets/icons/delete.svg';
import Close from 'react-native-template/assets/icons/close.svg';

import { useTaskContext } from 'react-native-template/src/contexts';
import { AsyncError, Task } from 'react-native-template/src/types';
import { taskModalStyles } from './task.style';

interface TaskDeleteModalProps {
  handleModalClose: () => void;
  isModalOpen: boolean;
  task: Task;
}

const TaskDeleteModal: React.FC<TaskDeleteModalProps> = ({
  task,
  handleModalClose,
  isModalOpen,
}) => {
  const { deleteTask, isDeleteTaskLoading } = useTaskContext();
  const styles = taskModalStyles();
  const theme = useTheme();

  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
  }>({ visible: false, message: '' });

  const onTaskOperationComplete = (message: string) => {
    setSnackbar({
      visible: true,
      message,
    });
  };

  const onTaskOperationFailure = (err: AsyncError) => {
    setSnackbar({
      visible: true,
      message: err.message,
    });
  };

  const handleDeleteTask = () => {
    deleteTask(task)
      .then(() => {
        onTaskOperationComplete(t('task:deleteTaskSuccess'));
        handleModalClose();
      })
      .catch((err: AsyncError) => {
        onTaskOperationFailure(err);
      });
  };

  return (
    <Portal>
      <Dialog
        visible={isModalOpen}
        onDismiss={handleModalClose}
        style={styles.dialog}
      >
        <Dialog.Title>
          <Text variant="titleLarge" style={styles.heading}>
            Delete Task
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
            <Text>Are you sure you want to delete this task?</Text>
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
              onPress={handleDeleteTask}
              loading={isDeleteTaskLoading}
              buttonColor={theme.colors.error}
              style={styles.button}
              icon={() => (
                <DeleteIcon
                  width={16}
                  height={16}
                  fill={theme.colors.onError}
                />
              )}
            >
              Delete
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() =>
          setSnackbar({ visible: false, message: '' })
        }
      >
        {snackbar.message}
      </Snackbar>
    </Portal>
  );
};

export default TaskDeleteModal;

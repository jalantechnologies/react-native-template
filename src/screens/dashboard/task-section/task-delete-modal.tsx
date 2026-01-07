import { t } from 'i18next';
import { Box, Text, Toast } from 'native-base';
import React from 'react';
import { Button, useTheme } from 'react-native-paper';
import DeleteIcon from 'react-native-template/assets/icons/delete.svg';
import { Modal } from 'react-native-template/src/components';
import { useTaskContext } from 'react-native-template/src/contexts';
import { AsyncError, Task } from 'react-native-template/src/types';

import { useTaskModalStyles } from './task.style';

import type { AppTheme } from '@/theme';

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
  const theme = useTheme<AppTheme>();
  const styles = useTaskModalStyles();

  const { deleteTask, isDeleteTaskLoading } = useTaskContext();

  const onTaskOperationComplete = (desc: string) => {
    Toast.show({
      title: 'Success',
      description: desc,
    });
  };

  const onTaskOperationFailure = (err: AsyncError) => {
    Toast.show({
      title: 'Error',
      description: err.message,
    });
  };

  const handleDeleteTask = () => {
    deleteTask(task)
      .then(() => {
        onTaskOperationComplete(t('task:deleteTaskSuccess'));
        handleModalClose();
      })
      .catch(err => {
        onTaskOperationFailure(err);
      });
  };

  return (
    <Modal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
      <Modal.Header title="Delete Task" onClose={handleModalClose} />
      <Modal.Body>
        <Box alignItems="center">
          <Text textAlign={'center'}>Are you sure you want to delete this task?</Text>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Box flex={1} mr={2}>
          <Button
            mode="outlined"
            onPress={handleModalClose}
            style={styles.deleteButton}
          >
            Cancel
          </Button>
        </Box>
        <Box flex={1} ml={2}>
          <Button
            mode="contained"
            onPress={handleDeleteTask}
            loading={isDeleteTaskLoading}
            buttonColor={theme.colors.error}
            style={styles.button}
            icon={() => (
              <DeleteIcon
                width={theme.iconSizes.sm}
                height={theme.iconSizes.sm}
                fill={theme.colors.onPrimary}
              />
            )}
          >
            Delete
          </Button>

        </Box>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDeleteModal;

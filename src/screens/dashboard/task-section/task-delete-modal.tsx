import DeleteIcon from 'boilerplate-react-native/assets/icons/delete.svg';
import { Button, Modal } from 'boilerplate-react-native/src/components';
import { useTaskContext } from 'boilerplate-react-native/src/contexts';
import { AsyncError, Task } from 'boilerplate-react-native/src/types';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { t } from 'i18next';
import { Box, Text, Toast, useTheme } from 'native-base';
import React from 'react';

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
  const theme = useTheme();

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
          <Button onClick={handleModalClose} kind={ButtonKind.SECONDARY}>
            Cancel
          </Button>
        </Box>
        <Box flex={1} ml={2}>
          <Button
            isLoading={isDeleteTaskLoading}
            onClick={handleDeleteTask}
            kind={ButtonKind.DANGER}
            startEnhancer={<DeleteIcon width={16} height={16} fill={theme.colors.secondary[50]} />}
          >
            Delete
          </Button>
        </Box>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskDeleteModal;

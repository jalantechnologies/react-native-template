import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'boilerplate-react-native/src/components';
import { useTaskContext } from 'boilerplate-react-native/src/contexts';
import { AsyncError, Task } from 'boilerplate-react-native/src/types';
import { ButtonKind } from 'boilerplate-react-native/src/types/button';
import { t } from 'i18next';
import { Box, Icon, Text, Toast } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    <Modal isModalOpen={isModalOpen} onRequestClose={handleModalClose}>
      <ModalHeader title="Delete Task" onClose={handleModalClose} />
      <ModalBody>
        <Box alignItems="center">
          <Text textAlign={'center'}>Are you sure you want to delete this task?</Text>
        </Box>
      </ModalBody>
      <ModalFooter>
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" width="100%">
          <Button onClick={handleModalClose} kind={ButtonKind.SECONDARY} width="48%">
            Cancel
          </Button>
          <Button
            isLoading={isDeleteTaskLoading}
            onClick={handleDeleteTask}
            kind={ButtonKind.DANGER}
            width="48%"
            startEnhancer={<Icon as={<MaterialIcons name="delete" />} color={'secondary.50'} />}
          >
            Delete
          </Button>
        </Box>
      </ModalFooter>
    </Modal>
  );
};

export default TaskDeleteModal;

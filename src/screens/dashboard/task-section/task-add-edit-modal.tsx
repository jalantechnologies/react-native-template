import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'boilerplate-react-native/src/components';
import { VStack } from 'native-base';
import React from 'react';

import { TaskModal, TaskOperation } from '../../../constants';
import { AsyncError, Nullable, Task } from '../../../types';

import useTaskAddEditForm from './task-add-edit-form-hook';

interface TaskAddEditModalProps {
  isModalOpen: boolean;
  onTaskOperationComplete: (description: string) => void;
  onTaskOperationFailure: (err: AsyncError) => void;
  setModalOpen: (isOpen: boolean) => void;
  task?: Nullable<Task>;
  taskOperation: Nullable<TaskOperation>;
}

const TaskAddEditModal: React.FC<TaskAddEditModalProps> = ({
  isModalOpen,
  onTaskOperationComplete,
  onTaskOperationFailure,
  setModalOpen,
  task,
  taskOperation,
}) => {
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const onTaskOperationSuccess = (description: string) => {
    handleModalClose();
    onTaskOperationComplete(description);
  };

  const { formik, isAddTaskLoading, isUpdateTaskLoading } = useTaskAddEditForm({
    onTaskOperationSuccess,
    onTaskOperationFailure,
    task: taskOperation === TaskOperation.EDIT ? task : null,
  });

  const modalHeading = () => {
    switch (taskOperation) {
      case TaskOperation.ADD:
        return TaskModal.ADD_TASK_HEADING;
      case TaskOperation.EDIT:
        return TaskModal.EDIT_TASK_HEADING;
      default:
        return '';
    }
  };

  const buttonText = () => {
    switch (taskOperation) {
      case TaskOperation.ADD:
        return TaskModal.ADD_TASK_BUTTON;
      case TaskOperation.EDIT:
        return TaskModal.EDIT_TASK_BUTTON;
      default:
        return '';
    }
  };

  const isLoading = () => {
    switch (taskOperation) {
      case TaskOperation.ADD:
        return isAddTaskLoading;
      case TaskOperation.EDIT:
        return isUpdateTaskLoading;
      default:
        return false;
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} onRequestClose={handleModalClose} key={taskOperation}>
      <ModalHeader title={modalHeading()} onClose={handleModalClose} />

      <ModalBody>
        <VStack space={4} p={4}>
          <FormControl label="Title" error={formik.errors.title}>
            <Input
              onChangeText={formik.handleChange('title')}
              value={formik.values.title}
              placeholder="Title"
            />
          </FormControl>

          <FormControl label="Description" error={formik.errors.description}>
            <Input
              onChangeText={formik.handleChange('description')}
              value={formik.values.description}
              placeholder="Description"
            />
          </FormControl>
        </VStack>
      </ModalBody>
      <ModalFooter>
        <Button isLoading={isLoading()} onClick={() => formik.handleSubmit()}>
          {buttonText()}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

TaskAddEditModal.defaultProps = {
  task: null,
};

export default TaskAddEditModal;

import { Box, Button, FormControl, Heading, Icon, Input, Modal, VStack } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
    <Modal isOpen={isModalOpen} avoidKeyboard={true} onClose={handleModalClose} key={taskOperation}>
      <Modal.Content>
        <Modal.Header>
          <Box flexDirection={'row'} justifyContent={'space-between'}>
            <Heading>{modalHeading()}</Heading>
            <Icon size={6} as={<MaterialIcons name="close" />} onPress={handleModalClose} />
          </Box>
        </Modal.Header>

        <VStack space={4} p={4}>
          <FormControl
            isRequired={true}
            isInvalid={formik.touched.title && Boolean(formik.errors.title)}
          >
            <FormControl.Label>Title</FormControl.Label>
            <Input
              onChangeText={formik.handleChange('title')}
              value={formik.values.title}
              placeholder="Title"
            />
            <FormControl.ErrorMessage>{formik.errors.title}</FormControl.ErrorMessage>
          </FormControl>

          <FormControl
            isRequired={true}
            isInvalid={formik.touched.description && Boolean(formik.errors.description)}
          >
            <FormControl.Label>Description</FormControl.Label>
            <Input
              onChangeText={formik.handleChange('description')}
              value={formik.values.description}
              placeholder="Description"
            />
            <FormControl.ErrorMessage>{formik.errors.description}</FormControl.ErrorMessage>
          </FormControl>

          <Button isLoading={isLoading()} mt={4} onPress={() => formik.handleSubmit()}>
            {buttonText()}
          </Button>
        </VStack>
      </Modal.Content>
    </Modal>
  );
};

TaskAddEditModal.defaultProps = {
  task: null,
};

export default TaskAddEditModal;

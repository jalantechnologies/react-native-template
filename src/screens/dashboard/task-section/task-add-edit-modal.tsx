import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

import { AppTextInput } from '../../../components';
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
    <Portal>
      <Dialog visible={isModalOpen} onDismiss={handleModalClose}>
        <Dialog.Title>{modalHeading()}</Dialog.Title>
        <Dialog.Content>
          <View style={styles.form}>
            <AppTextInput
              label="Title"
              onChangeText={formik.handleChange('title')}
              value={formik.values.title}
              placeholder="Title"
              errorText={formik.touched.title ? formik.errors.title : undefined}
            />

            <AppTextInput
              label="Description"
              onChangeText={formik.handleChange('description')}
              value={formik.values.description}
              placeholder="Description"
              multiline
              numberOfLines={3}
              errorText={formik.touched.description ? formik.errors.description : undefined}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleModalClose}>Cancel</Button>
          <Button
            mode="contained"
            loading={isLoading()}
            onPress={() => formik.handleSubmit()}
          >
            {buttonText()}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 8,
  },
});

export default TaskAddEditModal;

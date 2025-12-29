import React from 'react';
import { View } from 'react-native';
import {
  Dialog,
  Portal,
  IconButton,
  Text,
  useTheme,
  Button,
  TextInput,
  HelperText,
} from 'react-native-paper';

import { TaskModal, TaskOperation } from '../../../constants';
import { AsyncError, Nullable, Task } from '../../../types';
import Close from 'react-native-template/assets/icons/close.svg';
import useTaskAddEditForm from './task-add-edit-form-hook';
import { taskModalStyles } from './task.style';

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
  task = null,
  taskOperation,
}) => {
  const theme = useTheme();
  const styles = taskModalStyles();
  const [submitted, setSubmitted] = React.useState(false);

  const handleModalClose = () => {
    setSubmitted(false);
    setModalOpen(false);
  };

  const onTaskOperationSuccess = (description: string) => {
    handleModalClose();
    onTaskOperationComplete(description);
  };

  const { formik, isAddTaskLoading, isUpdateTaskLoading } =
    useTaskAddEditForm({
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
      <Dialog
        visible={isModalOpen}
        onDismiss={handleModalClose}
        style={styles.dialog}
      >
        <Dialog.Title>
          <Text variant="titleLarge" style={styles.heading}>
            {modalHeading()}
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
          <View>
            <Text style={styles.text}>Title</Text>
            <TextInput
              mode="outlined"
              placeholder="Title"
              value={formik.values.title}
              onChangeText={formik.handleChange('title')}
              style={{ backgroundColor: theme.colors.surface }}
              error={submitted && !!formik.errors.title}
            />
            <HelperText type="error" visible={submitted && !!formik.errors.title}>
              {formik.errors.title}
            </HelperText>

            <Text style={styles.text}>Description</Text>
            <TextInput
              mode="outlined"
              placeholder="Description"
              value={formik.values.description}
              onChangeText={formik.handleChange('description')}
              multiline
              style={{ backgroundColor: theme.colors.surface }}
              error={submitted && !!formik.errors.description}
            />
            <HelperText
              type="error"
              visible={submitted && !!formik.errors.description}
            >
              {formik.errors.description}
            </HelperText>
          </View>
        </Dialog.Content>

        <Dialog.Actions>
          <Button
            mode="contained"
            loading={isLoading()}
            onPress={() => {
              setSubmitted(true);
              formik.handleSubmit();
            }}
            style={styles.button}
          >
            {buttonText()}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default TaskAddEditModal;

import { VStack } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import {
  Text,
  useTheme,
  Button,
  TextInput,
  HelperText,
} from 'react-native-paper';
import { Modal } from 'react-native-template/src/components';

import { TaskModal, TaskOperation } from '../../../constants';
import { AsyncError, Nullable, Task } from '../../../types';

import useTaskAddEditForm from './task-add-edit-form-hook';
import { useTaskModalStyles } from './task.style';

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
  const theme = useTheme();
  const styles = useTaskModalStyles();
  const [submitted, setSubmitted] = React.useState(false);

  const handleModalClose = () => {
    setSubmitted(false);
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
    <Modal isModalOpen={isModalOpen} handleModalClose={handleModalClose} key={taskOperation}>
      <Modal.Header title={modalHeading()} onClose={handleModalClose} />
      <Modal.Body>
        <VStack space={4} p={4}>
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
          </View>
          <View>
            <Text style={styles.text}>Description</Text>
            <TextInput
              mode="outlined"
              placeholder="Description"
              value={formik.values.description}
              onChangeText={formik.handleChange('description')}
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
        </VStack>
      </Modal.Body>
      <Modal.Footer>
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
      </Modal.Footer>
    </Modal>
  );
};



export default TaskAddEditModal;

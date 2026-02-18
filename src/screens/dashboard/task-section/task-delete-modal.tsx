import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-native-paper';
import { useTaskContext, useToast } from 'react-native-template/src/contexts';
import { AsyncError, Task } from 'react-native-template/src/types';
import { AppDialog } from '../../../components';

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
  const { t } = useTranslation();
  const theme = useTheme() as any;
  const toast = useToast();
  const { deleteTask, isDeleteTaskLoading } = useTaskContext();

  const onTaskOperationComplete = (desc: string) => {
    toast.show(desc);
  };

  const onTaskOperationFailure = (err: AsyncError) => {
    toast.show(err.message);
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
    <AppDialog
      visible={isModalOpen}
      onDismiss={handleModalClose}
      title="Delete Task"
      content="Are you sure you want to delete this task?"
      onConfirm={handleDeleteTask}
      confirmLabel="Delete"
      confirmButtonColor={theme.colors.error}
      loading={isDeleteTaskLoading}
    />
  );
};

export default TaskDeleteModal;

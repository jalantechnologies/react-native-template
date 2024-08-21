import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import { TaskMessages, TaskValidationLimits } from '../../../constants';
import { useTaskContext } from '../../../contexts';
import { AsyncError, Nullable, Task } from '../../../types';

interface TaskAddEditFormProps {
  onTaskOperationFailure: (err: AsyncError) => void;
  onTaskOperationSuccess: (operation: string) => void;
  task: Nullable<Task>;
}

const useTaskAddEditForm = ({
  onTaskOperationFailure,
  onTaskOperationSuccess,
  task,
}: TaskAddEditFormProps) => {
  const { addTask, updateTask, isAddTaskLoading, isUpdateTaskLoading } = useTaskContext();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title: task?.title || '',
      description: task?.description || '',
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .min(TaskValidationLimits.TITLE_MIN_LENGTH, t('task:titleMinLength'))
        .required(t('task:titleRequired')),
      description: Yup.string()
        .min(TaskValidationLimits.DESCRIPTION_MIN_LENGTH, t('task:descriptionMinLength'))
        .required(t('task:descriptionRequired')),
    }),

    enableReinitialize: true,

    onSubmit: async values => {
      try {
        if (task) {
          await updateTask({ ...task, ...values });
          onTaskOperationSuccess(TaskMessages.EDIT_OPERATION);
        } else {
          await addTask(values.description, values.title);
          onTaskOperationSuccess(TaskMessages.ADD_OPERATION);
          formik.resetForm();
        }
      } catch (err) {
        onTaskOperationFailure(err as AsyncError);
      }
    },
  });

  return {
    formik,
    isAddTaskLoading,
    isUpdateTaskLoading,
  };
};

export default useTaskAddEditForm;

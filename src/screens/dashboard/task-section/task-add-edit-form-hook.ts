import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TaskMessages, TaskValidationLimits, TaskValidationMessages } from '../../../constants';
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

  const formik = useFormik({
    initialValues: {
      title: task?.title || '',
      description: task?.description || '',
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .min(TaskValidationLimits.TITLE_MIN_LENGTH, TaskValidationMessages.TITLE_MIN_LENGTH)
        .required(TaskValidationMessages.TITLE_REQUIRED),
      description: Yup.string()
        .min(
          TaskValidationLimits.DESCRIPTION_MIN_LENGTH,
          TaskValidationMessages.DESCRIPTION_MIN_LENGTH,
        )
        .required(TaskValidationMessages.DESCRIPTION_REQUIRED),
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

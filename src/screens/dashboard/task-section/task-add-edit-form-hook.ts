import { useFormik } from 'formik';
import * as Yup from 'yup';

import { TaskValidationLimits, TaskValidationMessages } from '../../../constants';
import { useTaskContext } from '../../../contexts';
import { Nullable, Task } from '../../../types';

interface TaskAddEditFormProps {
  onTaskOperationFailure: () => void;
  onTaskOperationSuccess: () => void;
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
      if (task) {
        updateTask({ ...task, ...values })
          .then(() => {
            onTaskOperationSuccess();
          })
          .catch(() => {
            onTaskOperationFailure();
          });
      } else {
        addTask(values.description, values.title)
          .then(() => {
            onTaskOperationSuccess();
          })
          .catch(() => {
            onTaskOperationFailure();
          });
        formik.resetForm();
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

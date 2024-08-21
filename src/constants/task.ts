export enum TaskOperation {
  ADD = 'Add',
  EDIT = 'Edit',
}

export const TaskValidationLimits = {
  TITLE_MIN_LENGTH: 3,
  DESCRIPTION_MIN_LENGTH: 10,
};

export const TaskMessages = {
  SUCCESS_TITLE: 'Success',
  ERROR_TITLE: 'Error',
  ADD_SUCCESS: (operation: string) => `Task ${operation} successfully`,
  NO_TASKS_FOUND: 'No tasks found',
  ADD_OPERATION: 'added',
  EDIT_OPERATION: 'updated',
  DELETE_OPERATION: 'deleted',
};

export const TaskModal = {
  ADD_TASK_HEADING: 'Add Task',
  EDIT_TASK_HEADING: 'Edit Task',
  ADD_TASK_BUTTON: 'Add Task',
  EDIT_TASK_BUTTON: 'Save Changes',
};

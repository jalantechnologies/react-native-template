export enum TaskOperation {
  ADD = 'Add',
  EDIT = 'Edit',
  DELETE = 'Delete',
}

export const TaskValidationLimits = {
  TITLE_MIN_LENGTH: 3,
  DESCRIPTION_MIN_LENGTH: 10,
};

export const TaskValidationMessages = {
  TITLE_MIN_LENGTH: `Title must be at least ${TaskValidationLimits.TITLE_MIN_LENGTH} characters`,
  TITLE_REQUIRED: 'Title is required',
  DESCRIPTION_MIN_LENGTH: `Description must be at least ${TaskValidationLimits.DESCRIPTION_MIN_LENGTH} characters`,
  DESCRIPTION_REQUIRED: 'Description is required',
};

export const TaskMessages = {
  SUCCESS_TITLE: 'Success',
  ERROR_TITLE: 'Error',
  ADD_SUCCESS: (operation: string) => `Task ${operation} successfully`,
  ADD_FAILURE: (operation: string) => `Task ${operation} failed`,
  NO_TASKS_FOUND: 'No tasks found',
  ADD_OPERATION: 'added',
  EDIT_OPERATION: 'updated',
  DELETE_OPERATION: 'deleted',
  ADD_FAILURE_OPERATION: 'addition',
  EDIT_FAILURE_OPERATION: 'updation',
};

export const TaskModal = {
  ADD_TASK_HEADING: 'Add Task',
  EDIT_TASK_HEADING: 'Edit Task',
  ADD_TASK_BUTTON: 'Add Task',
  EDIT_TASK_BUTTON: 'Save Changes',
};

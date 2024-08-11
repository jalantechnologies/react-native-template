import React, {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { TaskService } from '../services';
import { AccessToken, Task } from '../types';

import { useAuthContext } from './auth-context';

interface TaskContextInterface {
  addTask: (task: Task) => Promise<void>;
  deleteTask: (task: Task) => Promise<void>;
  getTasks: () => Promise<void>;
  isAddTaskLoading: boolean;
  isDeleteTaskLoading: boolean;
  isTasksLoading: boolean;
  isUpdateTaskLoading: boolean;
  tasks: Task[];
  updateTask: (task: Task) => Promise<void>;
}

export const TaskContext = createContext<TaskContextInterface | undefined>(undefined);

export const useTaskContext = (): TaskContextInterface =>
  useContext(TaskContext as Context<TaskContextInterface>);

export const TaskContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const taskService = useMemo(() => new TaskService(), []);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [isAddTaskLoading, setIsAddTaskLoading] = useState(false);
  const [isUpdateTaskLoading, setIsUpdateTaskLoading] = useState(false);
  const [isDeleteTaskLoading, setIsDeleteTaskLoading] = useState(false);

  const { getAccessTokenFromStorage } = useAuthContext();

  const getTasks = async () => {
    setIsTasksLoading(true);
    const { data, error } = await taskService.getAllTasks(
      getAccessTokenFromStorage() as AccessToken,
    );
    if (data) {
      setTasks(data.map((task: Task) => new Task({ ...task })));
    }
    if (error) {
      throw error;
    }
    setIsTasksLoading(false);
  };

  const addTask = async (task: Task) => {
    setIsAddTaskLoading(true);
    const { error } = await taskService.addTask(task, getAccessTokenFromStorage() as AccessToken);
    if (error) {
      throw error;
    } else {
      setTasks(prevTasks => [...prevTasks, task]);
    }
    setIsAddTaskLoading(false);
  };

  const updateTask = async (task: Task) => {
    setIsUpdateTaskLoading(true);
    const { error } = await taskService.updateTask(
      task,
      getAccessTokenFromStorage() as AccessToken,
    );
    if (error) {
      throw error;
    } else {
      setTasks(prevTasks =>
        prevTasks.map(t => {
          if (t.id === task.id) {
            return task;
          }
          return t;
        }),
      );
    }
    setIsUpdateTaskLoading(false);
  };

  const deleteTask = async (task: Task) => {
    setIsDeleteTaskLoading(true);
    const { error } = await taskService.deleteTask(
      task,
      getAccessTokenFromStorage() as AccessToken,
    );
    if (error) {
      throw error;
    } else {
      setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
    }
    setIsDeleteTaskLoading(false);
  };

  return (
    <TaskContext.Provider
      value={{
        addTask,
        deleteTask,
        getTasks,
        isAddTaskLoading,
        isDeleteTaskLoading,
        isTasksLoading,
        isUpdateTaskLoading,
        tasks,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

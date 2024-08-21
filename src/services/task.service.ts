import { AccessToken, APIResponse } from '../types';
import { Task } from '../types';

import { APIService } from './api-service';

export class TaskService extends APIService {
  addTask = async (
    description: string,
    title: string,
    userAccessToken: AccessToken,
  ): Promise<APIResponse> => {
    return this.post(
      '/tasks',
      { title, description },
      this.getAuthorizationHeader(userAccessToken.token),
    );
  };

  getAllTasks = async (userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.get('/tasks', this.getAuthorizationHeader(userAccessToken.token));
  };

  getTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.get(`/tasks/${task.id}`, this.getAuthorizationHeader(userAccessToken.token));
  };

  updateTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.patch(
      `/tasks/${task.id}`,
      task,
      this.getAuthorizationHeader(userAccessToken.token),
    );
  };

  deleteTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.delete(`/tasks/${task.id}`, this.getAuthorizationHeader(userAccessToken.token));
  };
}

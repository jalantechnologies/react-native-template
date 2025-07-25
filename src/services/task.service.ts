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
      `/accounts/${userAccessToken.accountId}/tasks`,
      { title, description },
      this.getAuthorizationHeader(userAccessToken.token),
    );
  };

  getAllTasks = async (userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.get(
      `/accounts/${userAccessToken.accountId}/tasks`,
      this.getAuthorizationHeader(userAccessToken.token),
    );
  };

  getTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.get(
      `/accounts/${userAccessToken.accountId}/tasks/${task.id}`,
      this.getAuthorizationHeader(userAccessToken.token),
    );
  };

  updateTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.patch(
      `/accounts/${userAccessToken.accountId}/tasks/${task.id}`,
      task,
      this.getAuthorizationHeader(userAccessToken.token),
    );
  };

  deleteTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.delete(
      `/accounts/${userAccessToken.accountId}/tasks/${task.id}`,
      this.getAuthorizationHeader(userAccessToken.token),
    );
  };
}

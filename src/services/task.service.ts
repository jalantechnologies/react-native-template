import { AccessToken, APIResponse } from '../types';
import { Task } from '../types';

import { APIService } from './api-service';

export class TaskService extends APIService {
  private getAuthHeaders(userAccessToken: AccessToken) {
    return {
      headers: { Authorization: `Bearer ${userAccessToken.token}` },
    };
  }

  addTask = async (
    description: string,
    title: string,
    userAccessToken: AccessToken,
  ): Promise<APIResponse> => {
    return this.post('/tasks', { title, description }, this.getAuthHeaders(userAccessToken));
  };

  getAllTasks = async (userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.get('/tasks', this.getAuthHeaders(userAccessToken));
  };

  getTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.get(`/tasks/${task.id}`, this.getAuthHeaders(userAccessToken));
  };

  updateTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.patch(`/tasks/${task.id}`, task, this.getAuthHeaders(userAccessToken));
  };

  deleteTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.delete(`/tasks/${task.id}`, this.getAuthHeaders(userAccessToken));
  };
}

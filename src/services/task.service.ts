import { AccessToken, APIResponse } from '../types';
import { Task } from '../types';

import { APIService } from './api-service';

export class TaskService extends APIService {
  addTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.post('/tasks', task, {
      headers: { Authorization: `Bearer ${userAccessToken.token}` },
    });
  };

  getAllTasks = async (userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.get('/tasks', {
      headers: { Authorization: `Bearer ${userAccessToken.token}` },
    });
  };

  getTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.get(`/tasks/${task.id}`, {
      headers: { Authorization: `Bearer ${userAccessToken.token}` },
    });
  };

  updateTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.patch(`/tasks/${task.id}`, task, {
      headers: { Authorization: `Bearer ${userAccessToken.token}` },
    });
  };

  deleteTask = async (task: Task, userAccessToken: AccessToken): Promise<APIResponse> => {
    return this.delete(`/tasks/${task.id}`, {
      headers: { Authorization: `Bearer ${userAccessToken.token}` },
    });
  };
}

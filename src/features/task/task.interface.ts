import type {
  TaskPriority,
  TaskStatus,
} from "../../schemas/task/create-task.schema";

export interface CreateTaskResponse {
  success: boolean;
  message: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  isOverdue: boolean;
  projectId: string;
  assignedDeveloperId: string;
  createdAt: string;
  updatedAt: string;
  assignedDeveloper: {
    id: string;
    name: string;
    email: string;
  };
  project: {
    name: string;
  };
}

export interface GetTasksResponse {
  success: boolean;
  message: string;
  data?: {
    tasks: Task[];
  };
}

export interface GetTaskQueryParams {
  status?: string;
  priority?: string;
  dueFrom?: string;
  dueTo?: string;
}

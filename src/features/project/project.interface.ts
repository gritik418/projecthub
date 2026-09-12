import type { TaskStatus } from "../../schemas/task/create-task.schema";
import type { Task } from "../task/task.interface";

export interface GetProjectsResponse {
  success: boolean;
  message: string;
  data?: {
    projects: Project[];
  };
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
  data?: {
    project: {
      id: string;
      name: string;
      description: string;
      clientId: string;
      createdById: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  clientId: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  client: {
    id: string;
    name: string;
    email: string;
    company: string;
    createdAt: string;
    updatedAt: string;
  };
  _count: {
    tasks: 0;
  };
}

export interface GetProjectDetailsResponse {
  success: boolean;
  message: string;
  data?: {
    project: ProjectDetails;
  };
}

export interface ProjectDetails extends Project {
  tasks: Task[];
}

export interface GetProjectActivityResponse {
  success: boolean;
  message: string;
  data?: {
    activities: ActivityLog[];
  };
}

export interface ActivityLog {
  id: string;
  taskId: string;
  userId: string;
  type: string;
  oldStatus: TaskStatus;
  newStatus: TaskStatus;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  task: {
    id: string;
    title: string;
    assignedDeveloper: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
}

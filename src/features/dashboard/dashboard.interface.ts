import type {
  TaskPriority,
  TaskStatus,
} from "../../schemas/task/create-task.schema";

export interface DashboardTaskDto {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;

  project: {
    id: string;
    name: string;
  };
}

export interface AdminDashboardResponseDto {
  totalProjects: number;
  totalTasks: number;

  tasksByStatus: {
    todo: number;
    inProgress: number;
    inReview: number;
    done: number;
  };

  overdueTasks: number;
}

export interface ProjectSummaryDto {
  total: number;
  active: number;
  completed: number;
}

export interface ProjectManagerDashboardResponseDto {
  projects: ProjectSummaryDto;

  tasks: {
    todo: number;
    inProgress: number;
    inReview: number;
    done: number;
    total: number;
  };
  upcomingDueTasks: DashboardTaskDto[];
}

export interface DeveloperDashboardResponseDto {
  assignedTasks: DashboardTaskDto[];
}

export interface DashboardAnalyticsResponseDto {
  success: boolean;
  message: string;
  data?:
    | AdminDashboardResponseDto
    | ProjectManagerDashboardResponseDto
    | DeveloperDashboardResponseDto;
}

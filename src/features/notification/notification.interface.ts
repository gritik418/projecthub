export interface Notification {
  id: string;

  type: "TASK_ASSIGNED" | "TASK_MOVED_TO_REVIEW";

  title: string;
  message: string;

  isRead: boolean;

  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };

  taskId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetNotificationsResponse {
  success: boolean;
  message: string;
  data?: {
    notifications: Notification[];
  };
}

export interface MarkNotificationsResponse {
  success: boolean;
  message: string;
}

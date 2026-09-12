export interface GetDevelopersResponse {
  success: boolean;
  message: string;
  data?: {
    developers: Developer[];
  };
}

export interface Developer {
  id: string;
  name: string;
  email: string;
}

export interface GetUsersResponse {
  success: boolean;
  message: string;
  data?: {
    users: User[];
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  _count: {
    assignedTasks: number;
  };
}

export interface GetProjectsResponse {
  success: boolean;
  message: string;
  data?: {
    projects: Project[];
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

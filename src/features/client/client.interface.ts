export interface GetClientsResponse {
  success: boolean;
  message: string;
  data?: {
    clients: Client[];
  };
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  company?: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    projects: number;
  };
}

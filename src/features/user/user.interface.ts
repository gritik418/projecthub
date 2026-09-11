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

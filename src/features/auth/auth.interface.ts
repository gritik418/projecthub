import type { LoginDto } from "../../schemas/auth/login.schema";
import type { RegisterDto } from "../../schemas/auth/register.schema";

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
  };
  errors?: Partial<LoginDto>;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  errors?: Partial<RegisterDto>;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "PROJECT_MANAGER" | "DEVELOPER";
  createdAt: string;
  updatedAt: string;
}

export interface GetMeResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
  };
}

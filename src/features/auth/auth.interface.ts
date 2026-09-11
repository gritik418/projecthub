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

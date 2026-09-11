import type { LoginDto } from "../../schemas/auth/login.schema";
import type { RegisterDto } from "../../schemas/auth/register.schema";
import baseApi from "../../store/api/base-api";
import type { LoginResponse, RegisterResponse } from "./auth.interface";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegisterResponse, RegisterDto>({
      query: (data: RegisterDto) => ({
        url: "/auth/register",
        body: data,
        method: "POST",
      }),
    }),
    login: build.mutation<LoginResponse, LoginDto>({
      query: (data: LoginDto) => ({
        url: "/auth/login",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

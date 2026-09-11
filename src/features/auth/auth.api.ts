import type { LoginDto } from "../../schemas/auth/login.schema";
import baseApi from "../../store/api/base-api";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<any, LoginDto>({
      query: (data: LoginDto) => ({
        url: "/auth/login",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

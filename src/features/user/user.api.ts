import baseApi from "../../store/api/base-api";
import type { GetDevelopersResponse, GetUsersResponse } from "./user.interface";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDevelopers: build.query<GetDevelopersResponse, void>({
      query: () => ({
        url: "/user/developers",
        method: "GET",
      }),
    }),
    getUsers: build.query<GetUsersResponse, void>({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDevelopersQuery, useGetUsersQuery } = userApi;

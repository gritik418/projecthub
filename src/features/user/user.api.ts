import baseApi from "../../store/api/base-api";
import type { GetDevelopersResponse } from "./user.interface";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDevelopers: build.query<GetDevelopersResponse, void>({
      query: () => ({
        url: "/user/developers",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDevelopersQuery } = userApi;

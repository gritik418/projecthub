import baseApi from "../../store/api/base-api";
import type { GetProjectsResponse } from "./project.interface";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<GetProjectsResponse, void>({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProjectsQuery } = projectApi;

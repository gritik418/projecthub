import baseApi from "../../store/api/base-api";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProjectsQuery } = projectApi;

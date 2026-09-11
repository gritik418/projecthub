import type { CreateProjectDto } from "../../schemas/project/create-project.schema";
import baseApi from "../../store/api/base-api";
import type {
  CreateProjectResponse,
  GetProjectDetailsResponse,
  GetProjectsResponse,
} from "./project.interface";

const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProjects: build.query<GetProjectsResponse, void>({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
      providesTags: ["Project"],
    }),
    createProject: build.mutation<CreateProjectResponse, CreateProjectDto>({
      query: (data: CreateProjectDto) => ({
        url: "/project",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Project"],
    }),
    getProjectDetails: build.query<GetProjectDetailsResponse, string>({
      query: (projectId: string) => ({
        url: `/project/${projectId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetProjectDetailsQuery,
} = projectApi;

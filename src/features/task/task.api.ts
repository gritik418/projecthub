import type { CreateTaskDto } from "../../schemas/task/create-task.schema";
import baseApi from "../../store/api/base-api";
import type {
  CreateTaskResponse,
  GetTaskQueryParams,
  GetTasksResponse,
} from "./task.interface";

const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation<CreateTaskResponse, CreateTaskDto>({
      query: (data: CreateTaskDto) => ({
        url: "/task",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    getTasks: build.query<GetTasksResponse, GetTaskQueryParams>({
      query: (params) => {
        return {
          url: "/task",
          method: "GET",
          params: params,
        };
      },
    }),
  }),
});

export const { useCreateTaskMutation, useGetTasksQuery } = taskApi;

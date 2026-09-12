import type { CreateTaskDto } from "../../schemas/task/create-task.schema";
import type { UpdateTaskStatusDto } from "../../schemas/task/update-task-status.schema";
import baseApi from "../../store/api/base-api";
import type {
  CreateTaskResponse,
  GetTaskQueryParams,
  GetTasksResponse,
  UpdateTaskStatusResponse,
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
      providesTags: ["Tasks"],
    }),
    updateTaskStatus: build.mutation<
      UpdateTaskStatusResponse,
      { data: UpdateTaskStatusDto; taskId: string }
    >({
      query: ({ data, taskId }) => ({
        url: `/task/${taskId}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} = taskApi;

export default taskApi;

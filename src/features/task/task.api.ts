import type { CreateTaskDto } from "../../schemas/task/create-task.schema";
import baseApi from "../../store/api/base-api";
import type { CreateTaskResponse } from "./task.interface";

const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation<CreateTaskResponse, CreateTaskDto>({
      query: (data: CreateTaskDto) => ({
        url: "/task",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateTaskMutation } = taskApi;

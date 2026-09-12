import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "./task.interface";
import taskApi from "./task.api";
import type { RootState } from "../../store";
import type { TaskStatus } from "../../schemas/task/create-task.schema";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    updateTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        status: TaskStatus;
      }>,
    ) => {
      const task = state.tasks.find(
        (task) => task.id === action.payload.taskId,
      );

      if (task) {
        task.status = action.payload.status;
      }
    },
  },

  extraReducers: (build) => {
    build.addMatcher(
      taskApi.endpoints.getTasks.matchFulfilled,
      (state, action) => {
        if (action.payload.data?.tasks) {
          state.tasks = action.payload.data.tasks;
        }
      },
    );
  },
});

export const { updateTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.taskSlice.tasks;

export default taskSlice;

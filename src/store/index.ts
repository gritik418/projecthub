import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/base-api";
import authSlice from "../features/auth/auth.slice";
import userSlice from "../features/user/user.slice";
import taskSlice from "../features/task/task.slice";
import notificationSlice from "../features/notification/notification.slice";

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [taskSlice.reducerPath]: taskSlice.reducer,
    [notificationSlice.reducerPath]: notificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

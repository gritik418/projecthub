import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../store";
import notificationApi from "./notification.api";
import type { Notification } from "./notification.interface";

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    updateNotifications: (
      state,
      action: PayloadAction<{
        notifications: Notification[];
      }>,
    ) => {
      state.notifications = action.payload.notifications;
    },
  },

  extraReducers: (build) => {
    build.addMatcher(
      notificationApi.endpoints.getNotifications.matchFulfilled,
      (state, action) => {
        if (action.payload.data?.notifications) {
          state.notifications = action.payload.data.notifications;
        }
      },
    );
  },
});

export const { updateNotifications } = notificationSlice.actions;

export const selectNotifications = (state: RootState) =>
  state.notificationSlice.notifications;

export default notificationSlice;

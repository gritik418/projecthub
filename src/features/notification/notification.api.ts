import baseApi from "../../store/api/base-api";
import type { GetNotificationsResponse } from "./notification.interface";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<GetNotificationsResponse, void>({
      query: () => ({
        url: "/notification",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;

export default notificationApi;

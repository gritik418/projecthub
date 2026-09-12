import baseApi from "../../store/api/base-api";
import type {
  GetNotificationsResponse,
  MarkNotificationsResponse,
} from "./notification.interface";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<GetNotificationsResponse, void>({
      query: () => ({
        url: "/notification",
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    markAllAsRead: build.mutation<MarkNotificationsResponse, void>({
      query: () => ({
        url: "/notification/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    markAsRead: build.mutation<MarkNotificationsResponse, string>({
      query: (notificationId: string) => ({
        url: `/notification/${notificationId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} = notificationApi;

export default notificationApi;

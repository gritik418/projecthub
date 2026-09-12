import baseApi from "../../store/api/base-api";
import type { DashboardAnalyticsResponseDto } from "./dashboard.interface";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashboardAnalytics: build.query<DashboardAnalyticsResponseDto, void>({
      query: () => ({
        url: "/dashboard/analytics",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardAnalyticsQuery } = dashboardApi;

export default dashboardApi;

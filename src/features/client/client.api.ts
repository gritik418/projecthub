import baseApi from "../../store/api/base-api";
import type { GetClientsResponse } from "./client.interface";

const clientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClients: build.query<GetClientsResponse, void>({
      query: () => ({
        url: "/client",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetClientsQuery } = clientApi;

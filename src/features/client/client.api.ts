import type { CreateClientDto } from "../../schemas/client/create-client.schema";
import baseApi from "../../store/api/base-api";
import type { GetClientsResponse } from "./client.interface";

const clientApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClients: build.query<GetClientsResponse, void>({
      query: () => ({
        url: "/client",
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    createClient: build.mutation<any, CreateClientDto>({
      query: (data: CreateClientDto) => ({
        url: "/client",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const { useGetClientsQuery, useCreateClientMutation } = clientApi;

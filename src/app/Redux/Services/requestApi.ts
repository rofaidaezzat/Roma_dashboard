import { api } from "./api";
import { Request } from "../../types/request";

export interface GetRequestsResponse {
  status: string;
  code: number;
  message: string;
  data: {
    results: number;
    pagination: {
      currentPage: number;
      limit: number;
      numberOfPages: number;
    };
    data: Request[];
  };
}

export interface GetRequestResponse {
  status: string;
  code: number;
  message: string;
  data: Request;
}

export const requestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRequests: builder.query<GetRequestsResponse, void>({
      query: () => "/api/v1/contact-us",
      providesTags: ["Request"],
    }),
    getRequest: builder.query<GetRequestResponse, string>({
      query: (id) => `/api/v1/contact-us/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Request", id }],
    }),
    deleteRequest: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/api/v1/contact-us/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Request"],
    }),
    updateRequestStatus: builder.mutation<{ message: string }, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/api/v1/contact-us/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Request", id },
        "Request",
      ],
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useGetRequestQuery,
  useDeleteRequestMutation,
  useUpdateRequestStatusMutation,
} = requestApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const businessVerificationRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBusinessVerificationRequests: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        status?: string;
        keyword?: string;
      }
    >({
      query: ({ page = 1, limit = 10, status, keyword } = {}) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (status) params.append("status", status);
        if (keyword) params.append("keyword", keyword);

        return {
          url: `/business-verification/all?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["verificationRequest"],
    }),

    // For admin
    changeStatus: builder.mutation<any, any>({
      query: ({ id, status }) => ({
        url: `/business-verification/change-status/${id}`,
        method: "PATCH",
        body: { status },
        credentials: "include",
      }),
      invalidatesTags: ["verificationRequest"],
    }),
  }),
});

export const {
  useGetAllBusinessVerificationRequestsQuery,
  useChangeStatusMutation,
} = businessVerificationRequestApi;

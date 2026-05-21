/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const verificationRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVerificationRequests: builder.query<
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
          url: `/profile-verification?${params.toString()}`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["verificationRequest"],
    }),

    // For admin
    markAsReviewing: builder.mutation<any, any>({
      query: (id) => ({
        url: `/profile-verification/status/reviewing/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["verificationRequest"],
    }),

    markAsVerified: builder.mutation<any, any>({
      query: (id) => ({
        url: `/profile-verification/status/verified/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["verificationRequest"],
    }),
  }),
});

export const {
  useGetAllVerificationRequestsQuery,
  useMarkAsReviewingMutation,
  useMarkAsVerifiedMutation
} = verificationRequestApi;

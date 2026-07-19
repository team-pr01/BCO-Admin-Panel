/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../API/baseApi";

const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessages: builder.query({
      query: () => {
        return {
          url: `/contact-us`,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["messages"],
    }),

    getSingleMessage: builder.query({
      query: (id) => ({
        url: `/contact-us/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["messages"],
    }),

    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/contact-us/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["messages"],
    }),

  }),
});

export const {
  useGetAllMessagesQuery,
  useGetSingleMessageQuery,
  useDeleteMessageMutation,
} = messageApi;
